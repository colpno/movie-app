import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { Genre, MediaType } from '~/types/common.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';
import { genreKeys } from './queryKey.ts';

type QueryOptions = UseQueryOptions<UseGetGenresResponse['data']>;

interface Params {
  page?: number;
  sort_by?: string;
}

interface GetGenresArgs {
  mediaType: MediaType;
  params?: Params;
  signal: AbortSignal;
}

export interface UseGetGenresArgs extends Omit<GetGenresArgs, 'signal'> {
  queryOptions?: Omit<QueryOptions, 'queryKey'>;
}

export interface UseGetGenresResponse extends ApiSuccessResponse {
  data: Genre[];
}

const getGenres = async ({ mediaType, params, signal }: GetGenresArgs) => {
  const BASE_URL = `genres/${mediaType}`;
  return (await axiosClient.get<never, UseGetGenresResponse>(BASE_URL, { params, signal })).data;
};

const getGenresQuery = (args: UseGetGenresArgs): QueryOptions => {
  const { mediaType, params, queryOptions } = args;
  return {
    ...queryOptions,
    initialData: [],
    queryFn: async ({ signal }) => await getGenres({ ...args, signal }),
    queryKey: params ? genreKeys.list(mediaType, params) : genreKeys.lists(mediaType),
  };
};

export const useGetGenres = (args: UseGetGenresArgs) => useQuery(getGenresQuery(args));

export const genresLoader = (args: UseGetGenresArgs) => async () => {
  const query = getGenresQuery(args);
  return ((await queryClient.getQueryData(query.queryKey ?? 'genres')) ??
    (await queryClient.fetchQuery(query))) as UseGetGenresResponse['data'];
};
