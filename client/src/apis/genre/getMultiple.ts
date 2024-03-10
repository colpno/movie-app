import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { Genre, MediaType } from '~/types/common.ts';
import axiosClient, { SuccessfulResponse } from '../axios.ts';
import { genreKeys } from './queryKey.ts';

type QueryOptions = UseQueryOptions<Response['data']>;

interface Params {
  page?: number;
  sort_by?: string;
}

export interface Args {
  mediaType: MediaType;
  params?: Params;
  queryOptions?: Omit<QueryOptions, 'queryKey'>;
}

export interface Response extends SuccessfulResponse {
  data: Genre[];
}

const getGenres = async ({ mediaType, params }: Args) => {
  const BASE_URL = `genres/${mediaType}`;
  return (await axiosClient.get<never, Response>(BASE_URL, { params })).data;
};

const getGenresQuery = (args: Args): QueryOptions => {
  const { mediaType, params, queryOptions } = args;
  return {
    ...queryOptions,
    initialData: [],
    queryFn: async () => await getGenres(args),
    queryKey: params ? genreKeys.list(mediaType, params) : genreKeys.lists(mediaType),
  };
};

export const useGetGenres = (args: Args) => useQuery(getGenresQuery(args));

export const genresLoader = (args: Args) => async () => {
  const query = getGenresQuery(args);
  return ((await queryClient.getQueryData(query.queryKey ?? 'genres')) ??
    (await queryClient.fetchQuery(query))) as Response['data'];
};
