import {
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import { MediaType } from '~/types/common.ts';
import axiosClient from '../axios.ts';
import { Args as BaseArgs, Response } from './getMultiple.ts';
import { videoKeys } from './queryKey.ts';

type QueryOptions<T> = UseInfiniteQueryOptions<Response<T>>;
type QueryFnParams<T extends MediaType> = QueryFunctionContext<QueryOptions<T>['queryKey'], number>;
type AxiosQueryArgs<T extends MediaType> = Omit<Args<T>, 'queryOptions'> & QueryFnParams<T>;

type Args<T extends MediaType> = Omit<BaseArgs<T>, 'queryOptions'> & {
  queryOptions?: Partial<
    Omit<
      QueryOptions<T>,
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
  >;
};

const getVideos = async <T extends MediaType>({
  mediaType,
  params,
  pageParam,
  signal,
}: AxiosQueryArgs<T>) => {
  return (
    await axiosClient.get<{ page: number }, Response<T>>(mediaType, {
      params: { ...params, page: pageParam },
      signal,
    })
  ).data;
};

export const useGetInfiniteVideos = <T extends MediaType>(args: Args<T>) => {
  const { mediaType, queryOptions } = args;
  return useInfiniteQuery({
    ...queryOptions,
    initialPageParam: 1,
    queryFn: (queryParams) => getVideos({ ...args, ...queryParams }),
    queryKey: videoKeys.list(mediaType, { page: 1 }),
    getNextPageParam: (lastPage: Response<T>['data']) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    getPreviousPageParam: (firstPage: Response<T>['data']) =>
      firstPage.page > 1 ? firstPage.page - 1 : undefined,
  });
};
