import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { Favorite, Filter, Sorting } from '~/types/common.ts';
import { SnakePropsToCamelProps } from '~/types/transformer.ts';
import axiosClient, { SuccessfulResponse } from '../axios.ts';
import { favoriteKeys } from './queryKey.ts';

type QueryOptions = UseQueryOptions<Response['data']>;

type Params = {
  embed?: string[];
  page?: number;
  perPage?: number;
  sortBy?: Sorting;
} & {
  [K in keyof SnakePropsToCamelProps<Favorite>]?: Filter;
};

export interface Args {
  params?: Params;
  queryOptions?: Omit<QueryOptions, 'queryKey'>;
}

export interface Response extends SuccessfulResponse {
  data: Favorite[];
}

const getFavorites = async (params?: Args['params']) => {
  const BASE_URL = 'favorites';
  return (await axiosClient.get<never, Response>(BASE_URL, { params })).data;
};

const getFavoritesQuery = (args?: Args): QueryOptions => {
  const { params, queryOptions } = args!;
  return {
    ...queryOptions,
    initialData: [],
    queryFn: () => getFavorites(params),
    queryKey: params ? favoriteKeys.list(params) : favoriteKeys.all,
  };
};

export const useGetFavorites = (args?: Args) => useQuery(getFavoritesQuery(args));

export const favoritesLoader = (args?: Args) => async () => {
  const query = getFavoritesQuery(args);
  return ((await queryClient.getQueryData(query.queryKey!)) ??
    (await queryClient.fetchQuery(query))) as Response['data'];
};
