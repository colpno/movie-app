import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { MediaType, Movie, TV } from '~/types/common.ts';
import axiosClient, { SuccessfulResponse } from '../axios.ts';
import { videoKeys } from './queryKey.ts';

type QueryOptions<T> = UseQueryOptions<Response<T>['data']>;

export interface Args<T extends MediaType> {
  id: number;
  mediaType: T;
  queryOptions?: Omit<QueryOptions<T>, 'queryKey'>;
}

export interface Response<T> extends SuccessfulResponse {
  data?: T extends 'movie' ? Movie : T extends 'tv' ? TV : never;
}

const getVideo = async <T extends MediaType>({ id, mediaType }: Args<T>) => {
  const BASE_URL = `${mediaType}/${id}`;
  return (await axiosClient.get<never, Response<T>>(BASE_URL)).data;
};

const getVideoQuery = <T extends MediaType>(args: Args<T>): QueryOptions<T> => {
  const { mediaType, id, queryOptions } = args;
  return {
    ...queryOptions,
    initialData: undefined,
    queryFn: async () => await getVideo<T>(args),
    queryKey: videoKeys.detail(mediaType, id),
  };
};

export const useGetVideo = <T extends MediaType>(args: Args<T>) => useQuery(getVideoQuery(args));
