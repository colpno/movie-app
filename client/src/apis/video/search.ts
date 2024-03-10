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

type QueryOptions<T extends MediaType> = UseQueryOptions<Response<T>>;

export interface Args<T extends MediaType> {
  mediaType: T;
  params?: Params<T>;
  queryOptions?: Omit<QueryOptions<T>, 'queryKey'>;
}

export type Response<T extends MediaType> = T extends 'movie'
  ? MovieResponse
  : T extends 'tv'
  ? TVResponse
  : never;

const searchVideos = async <T extends MediaType>({ mediaType, params }: Args<T>) => {
  const BASE_URL = `${mediaType}/search`;
  return await axiosClient.get<never, Response<T>>(BASE_URL, { params });
};

const searchVideoQuery = <T extends MediaType>(args: Args<T>): QueryOptions<T> => {
  const { mediaType, params, queryOptions } = args;
  return {
    ...queryOptions,
    initialData: undefined,
    queryFn: async () => await searchVideos<T>(args),
    queryKey: videoKeys.list(mediaType, params),
  };
};

export const useSearchVideos = <T extends MediaType>(args: Args<T>) =>
  useQuery(searchVideoQuery(args));
