import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { MediaType, Movie, TV } from '~/types/common.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';
import { videoKeys } from './queryKey.ts';

type QueryOptions<T> = UseQueryOptions<UseGetVideoResponse<T>['data']>;

interface GetVideoArgs<T extends MediaType> {
  id: number;
  mediaType: T;
  signal: AbortSignal;
}

export interface UseGetVideoArgs<T extends MediaType> extends Omit<GetVideoArgs<T>, 'signal'> {
  queryOptions?: Omit<QueryOptions<T>, 'queryKey'>;
}

export interface UseGetVideoResponse<T> extends ApiSuccessResponse {
  data?: T extends 'movie' ? Movie : T extends 'tv' ? TV : never;
}

const getVideo = async <T extends MediaType>({ id, mediaType, signal }: GetVideoArgs<T>) => {
  const BASE_URL = `${mediaType}/${id}`;
  return (await axiosClient.get<never, UseGetVideoResponse<T>>(BASE_URL, { signal })).data;
};

const getVideoQuery = <T extends MediaType>(args: UseGetVideoArgs<T>): QueryOptions<T> => {
  const { mediaType, id, queryOptions } = args;
  return {
    ...queryOptions,
    initialData: undefined,
    queryFn: async ({ signal }) => await getVideo<T>({ ...args, signal }),
    queryKey: videoKeys.detail(mediaType, id),
  };
};

export const useGetVideo = <T extends MediaType>(args: UseGetVideoArgs<T>) =>
  useQuery(getVideoQuery(args));
