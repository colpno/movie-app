import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { MediaType, SearchMovie, SearchTV } from '~/types/common.ts';
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
  page: number;
  results: SearchMovie[];
  total_pages: number;
  total_results: number;
}

interface TVResponse {
  page: number;
  results: SearchTV[];
  total_pages: number;
  total_results: number;
}

type Params<T extends MediaType> = T extends 'movie'
  ? MovieParams
  : T extends 'tv'
  ? TVParams
  : never;

type QueryOptions<T extends MediaType> = UseQueryOptions<UseSearchVideoResponse<T>>;

interface SearchVideoArgs<T extends MediaType> {
  mediaType: T;
  params?: Params<T>;
  signal: AbortSignal;
}

export interface UseSearchVideoArgs<T extends MediaType>
  extends Omit<SearchVideoArgs<T>, 'signal'> {
  queryOptions?: Omit<QueryOptions<T>, 'queryKey'>;
}

export type UseSearchVideoResponse<T extends MediaType> = T extends 'movie'
  ? MovieResponse
  : T extends 'tv'
  ? TVResponse
  : never;

const searchVideos = async <T extends MediaType>({
  mediaType,
  params,
  signal,
}: SearchVideoArgs<T>) => {
  const BASE_URL = `${mediaType}/search`;
  return await axiosClient.get<never, UseSearchVideoResponse<T>>(BASE_URL, { params, signal });
};

const searchVideoQuery = <T extends MediaType>(args: UseSearchVideoArgs<T>): QueryOptions<T> => {
  const { mediaType, params, queryOptions } = args;
  return {
    ...queryOptions,
    initialData: undefined,
    queryFn: async ({ signal }) => await searchVideos<T>({ ...args, signal }),
    queryKey: videoKeys.list(mediaType, params),
  };
};

export const useSearchVideos = <T extends MediaType>(args: UseSearchVideoArgs<T>) =>
  useQuery(searchVideoQuery(args));
