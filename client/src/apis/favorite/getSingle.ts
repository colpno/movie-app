import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Favorite, MediaType } from '~/types/common.ts';
import axiosClient, { SuccessfulResponse } from '../axios.ts';
import { favoriteKeys } from './queryKey.ts';

type QueryOptions = UseQueryOptions<Response['data']>;

export interface Args {
  mediaType: MediaType;
  videoId: number;
  queryOptions?: Omit<QueryOptions, 'queryKey'>;
}

export interface Response extends SuccessfulResponse {
  data?: Favorite;
}

const getFavorite = async ({ mediaType, videoId }: Args) => {
  const BASE_URL = `favorites/${mediaType}/${videoId}`;
  return (await axiosClient.get<never, Response>(BASE_URL)).data;
};

const getFavoriteQuery = (args: Args): QueryOptions => {
  const { mediaType, videoId, queryOptions } = args;
  return {
    ...queryOptions,
    initialData: undefined,
    queryFn: () => getFavorite(args),
    queryKey: favoriteKeys.detail(mediaType, videoId),
  };
};

export const useGetFavorite = (args: Args) => useQuery(getFavoriteQuery(args));
