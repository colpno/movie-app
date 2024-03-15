import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { DiscoverMovie, DiscoverTV, MediaType } from '~/types/common.ts';
import axiosClient from '../axios.ts';
import { videoKeys } from './queryKey.ts';

interface MovieParams {
  page?: number;
  sort_by?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  primary_release_year?: number;
  'primary_release_date.gte'?: Date;
  'primary_release_date.lte'?: Date;
  'release_date.gte'?: Date;
  'release_date.lte'?: Date;
  year?: number;
  region?: string;
  certification?: string;
  'certification.gte'?: string;
  'certification.lte'?: string;
  certification_country?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  watch_region?: string;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  with_release_type?: [1, 2, 3, 4, 5, 6];
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  with_watch_monetization_types?: ['flatrate', 'free', 'ads', 'rent', 'buy'];
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
}

interface TVParams {
  page?: number;
  sort_by?: string;
  include_adult?: boolean;
  include_null_first_air_dates?: boolean;
  language?: string;
  first_air_year?: number;
  'first_air_date.gte'?: Date;
  'first_air_date.lte'?: Date;
  'air_date.gte'?: Date;
  'air_date.lte'?: Date;
  year?: number;
  timezone?: string;
  screened_theatrically?: boolean;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  watch_region?: string;
  with_companies?: string;
  with_genres?: string;
  with_keywords?: string;
  with_networks?: number;
  with_origin_country?: string;
  with_original_language?: string;
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  with_status?: [0, 1, 2, 3, 4, 5];
  with_watch_monetization_types?: ['flatrate', 'free', 'ads', 'rent', 'buy'];
  with_type?: [0, 1, 2, 3, 4, 5, 6];
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
}

interface MovieResponse {
  results: DiscoverMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

interface TVResponse {
  results: DiscoverTV[];
  page: number;
  total_pages: number;
  total_results: number;
}

type QueryOptions<T extends MediaType> = UseQueryOptions<UseGetVideosResponse<T>['data']>;

type Params<T extends MediaType> = T extends 'movie'
  ? MovieParams
  : T extends 'tv'
  ? TVParams
  : never;

interface GetVideosArgs<T extends MediaType> {
  mediaType: T;
  params?: Params<T>;
  signal: AbortSignal;
}

export interface UseGetVideosArgs<T extends MediaType> extends Omit<GetVideosArgs<T>, 'signal'> {
  queryOptions?: QueryOptions<T>;
}

export type UseGetVideosResponse<T> = {
  data: T extends 'movie' ? MovieResponse : T extends 'tv' ? TVResponse : never;
};

const getVideos = async <T extends MediaType>({ mediaType, params, signal }: GetVideosArgs<T>) => {
  const BASE_URL = mediaType;
  return (await axiosClient.get<never, UseGetVideosResponse<T>>(BASE_URL, { params, signal })).data;
};

const getVideosQuery = <T extends MediaType>(args: UseGetVideosArgs<T>): QueryOptions<T> => {
  const { params, mediaType, queryOptions } = args;
  return {
    ...queryOptions,
    queryFn: ({ signal }) => getVideos<T>({ ...args, signal }),
    queryKey: params ? videoKeys.list(mediaType, params) : videoKeys.lists(mediaType),
  };
};

export const useGetVideos = <T extends MediaType>(args: UseGetVideosArgs<T>) =>
  useQuery(getVideosQuery<T>(args));

export const videosLoader =
  <T extends MediaType>(args: UseGetVideosArgs<T>) =>
  async () => {
    const query = getVideosQuery<T>(args);
    return ((await queryClient.getQueryData(query.queryKey ?? `${args.mediaType}s`)) ??
      (await queryClient.fetchQuery(query))) as UseGetVideosResponse<T>['data'];
  };
