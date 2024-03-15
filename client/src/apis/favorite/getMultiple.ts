import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { Favorite, Filter, Sorting } from '~/types/common.ts';
import { SnakePropsToCamelProps } from '~/types/transformer.ts';
import axiosClient, { SuccessfulResponse } from '../axios.ts';
import { favoriteKeys } from './queryKey.ts';

type QueryOptions = UseQueryOptions<UseGetFavoritesResponse['data']>;

type Params = {
  embed?: string[];
  page?: number;
  perPage?: number;
  sortBy?: Sorting;
} & {
  [K in keyof SnakePropsToCamelProps<Favorite>]?: Filter;
};

export interface GetFavoritesArgs {
  params?: Params;
  signal: AbortSignal;
}

export interface UseGetFavoritesArgs extends Omit<GetFavoritesArgs, 'signal'> {
  queryOptions?: Omit<QueryOptions, 'queryKey'>;
}

export interface UseGetFavoritesResponse extends SuccessfulResponse {
  data: Favorite[];
}

const getFavorites = async ({ signal, ...params }: GetFavoritesArgs) => {
  const BASE_URL = 'favorites';
  return (await axiosClient.get<never, UseGetFavoritesResponse>(BASE_URL, { params, signal })).data;
};

const getFavoritesQuery = (args?: UseGetFavoritesArgs): QueryOptions => {
  const { params, queryOptions } = args!;
  return {
    ...queryOptions,
    initialData: [],
    queryFn: ({ signal }) => getFavorites({ ...params, signal }),
    queryKey: params ? favoriteKeys.list(params) : favoriteKeys.all,
  };
};

export const useGetFavorites = (args?: UseGetFavoritesArgs) => useQuery(getFavoritesQuery(args));

export const favoritesLoader = (args?: UseGetFavoritesArgs) => async () => {
  const query = getFavoritesQuery(args);
  return ((await queryClient.getQueryData(query.queryKey!)) ??
    (await queryClient.fetchQuery(query))) as UseGetFavoritesResponse['data'];
};
