import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';

import { MediaType } from '~/types/common.ts';
import { InfiniteQueryFunctionParams } from '~/types/reactQuery.ts';
import axiosClient from '../axios.ts';
import { UseGetVideosArgs, UseGetVideosResponse } from './getMultiple.ts';
import { videoKeys } from './queryKey.ts';

type QueryOptions<T> = UseInfiniteQueryOptions<UseGetVideosResponse<T>>;
type QueryFnParams<T extends MediaType> = InfiniteQueryFunctionParams<QueryOptions<T>['queryKey']>;

type GetInfiniteVideosArgs<T extends MediaType> = Omit<
  UseGetInfiniteVideosArgs<T>,
  'queryOptions'
> &
  QueryFnParams<T>;

type UseGetInfiniteVideosArgs<T extends MediaType> = Omit<UseGetVideosArgs<T>, 'queryOptions'> & {
  queryOptions?: Partial<
    Omit<
      QueryOptions<T>,
      | 'queryKey'
      | 'queryFn'
      | 'getNextPageParam'
      | 'getPreviousPageParam'
      | 'behavior'
      | 'initialData'
      | 'persister'
      | 'placeholderData'
      | 'refetchInterval'
      | 'refetchIntervalInBackground'
      | 'refetchOnMount'
      | 'refetchOnReconnect'
      | 'refetchOnWindowFocus'
      | 'select'
      | 'throwOnError'
    >
  > & {
    queryKey?: unknown[];
  };
};

const getVideos = async <T extends MediaType>({
  mediaType,
  params,
  pageParam,
  signal,
}: GetInfiniteVideosArgs<T>) => {
  return (
    await axiosClient.get<{ page: number }, UseGetVideosResponse<T>>(mediaType, {
      params: { ...params, page: pageParam },
      signal,
    })
  ).data;
};

export const useGetInfiniteVideos = <T extends MediaType>(args: UseGetInfiniteVideosArgs<T>) => {
  const { mediaType, queryOptions } = args;
  return useInfiniteQuery({
    ...queryOptions,
    initialPageParam: 1,
    queryFn: (queryParams) => getVideos({ ...args, ...queryParams }),
    queryKey: [...videoKeys.list(mediaType, { page: 1 }), ...(queryOptions?.queryKey ?? [])],
    getNextPageParam: (lastPage: UseGetVideosResponse<T>['data']) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    getPreviousPageParam: (firstPage: UseGetVideosResponse<T>['data']) =>
      firstPage.page > 1 ? firstPage.page - 1 : undefined,
  });
};
