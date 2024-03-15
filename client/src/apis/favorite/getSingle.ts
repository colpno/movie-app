import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Favorite, MediaType } from '~/types/common.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';
import { favoriteKeys } from './queryKey.ts';

type QueryOptions = UseQueryOptions<UseGetFavoriteResponse['data']>;

interface GetFavoriteArgs {
  mediaType: MediaType;
  videoId: number;
  signal: AbortSignal;
}

export interface UseGetFavoriteArgs extends Omit<GetFavoriteArgs, 'signal'> {
  queryOptions?: Omit<QueryOptions, 'queryKey'>;
}

export interface UseGetFavoriteResponse extends ApiSuccessResponse {
  data?: Favorite;
}

const getFavorite = async ({ mediaType, videoId, signal }: GetFavoriteArgs) => {
  const BASE_URL = `favorites/${mediaType}/${videoId}`;
  return (await axiosClient.get<never, UseGetFavoriteResponse>(BASE_URL, { signal })).data;
};

const getFavoriteQuery = (args: UseGetFavoriteArgs): QueryOptions => {
  const { mediaType, videoId, queryOptions } = args;
  return {
    ...queryOptions,
    initialData: undefined,
    queryFn: ({ signal }) => getFavorite({ ...args, signal }),
    queryKey: favoriteKeys.detail(mediaType, videoId),
  };
};

export const useGetFavorite = (args: UseGetFavoriteArgs) => useQuery(getFavoriteQuery(args));
