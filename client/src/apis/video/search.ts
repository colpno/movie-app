import { useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';

import { MediaType, SearchMovie, SearchTV } from '~/types/common.ts';
import { InfiniteQueryFunctionParams, InfiniteQueryOptions } from '~/types/reactQuery.ts';
import axiosClient from '../axios.ts';
import { videoKeys } from './queryKey.ts';

interface MovieParams {
  query?: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: number;
  year?: string;
  region?: string;
}

interface TVParams {
  query?: string;
  page?: number;
  first_air_date_year?: number;
  include_adult?: boolean;
  language?: string;
  year?: number;
}

interface MovieResponse {
  data: {
    page: number;
    results: SearchMovie[];
    total_pages: number;
    total_results: number;
  };
}

interface TVResponse {
  data: {
    page: number;
    results: SearchTV[];
    total_pages: number;
    total_results: number;
  };
}

type Params<T extends MediaType> = T extends 'movie'
  ? MovieParams
  : T extends 'tv'
  ? TVParams
  : never;

type QueryOptions<T extends MediaType> = UseQueryOptions<UseSearchVideoResponse<T>['data']>;

interface SearchVideoArgs<T extends MediaType> {
  mediaType: T;
  params?: Params<T>;
  signal: AbortSignal;
}

export interface UseSearchInfiniteVideoArgs<T extends MediaType>
  extends Omit<SearchVideoArgs<T>, 'signal'> {
  queryOptions?: InfiniteQueryOptions<UseSearchVideoResponse<T>['data']>;
}

export interface UseSearchVideoArgs<T extends MediaType>
  extends Omit<SearchVideoArgs<T>, 'signal'> {
  queryOptions?: QueryOptions<T>;
}

export type UseSearchVideoResponse<T extends MediaType> = T extends 'movie'
  ? MovieResponse
  : T extends 'tv'
  ? TVResponse
  : { data: { page: 0; results: []; total_pages: 0; total_results: 0 } };

const searchVideos = async <T extends MediaType>({
  mediaType,
  params,
  signal,
  pageParam,
}: SearchVideoArgs<T> & Partial<InfiniteQueryFunctionParams>) => {
  const BASE_URL = `${mediaType}/search`;
  return (
    await axiosClient.get<never, UseSearchVideoResponse<T>>(BASE_URL, {
      params: { ...params, page: pageParam },
      signal,
    })
  ).data;
};

export const useSearchInfiniteVideos = <T extends MediaType>(
  args: UseSearchInfiniteVideoArgs<T>
) => {
  const { mediaType, params, queryOptions } = args;
  return useInfiniteQuery({
    ...queryOptions,
    initialPageParam: 1,
    queryFn: (params) => searchVideos<T>({ ...args, ...params }),
    queryKey: [...videoKeys.list(mediaType, params), ...(queryOptions?.queryKey ?? [])],
    getNextPageParam: (lastPage: UseSearchVideoResponse<T>['data']) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    getPreviousPageParam: (firstPage: UseSearchVideoResponse<T>['data']) =>
      firstPage.page > 1 ? firstPage.page - 1 : undefined,
  });
};
