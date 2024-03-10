import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { MediaType } from '~/types/common.ts';
import axiosClient from '../axios.ts';
import { videoKeys } from './queryKey.ts';

type QueryOptions = UseQueryOptions<Response['data']['results']>;

export interface Args {
  mediaType: MediaType;
  id: number;
  queryOptions?: Omit<QueryOptions, 'queryKey'>;
}

export interface Response {
  message: string;
  data: {
    id: number;
    results: {
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }[];
  };
}

const getTrailer = async ({ mediaType, id }: Args) => {
  const BASE_URL = `${mediaType}/${id}/trailer`;
  return (await axiosClient.get<never, Response>(BASE_URL)).data.results;
};

const getTrailerQuery = (args: Args): QueryOptions => ({
  ...args.queryOptions,
  initialData: undefined,
  queryFn: () => getTrailer(args),
  queryKey: videoKeys.trailer,
});

export const useGetTrailer = (args: Args) => useQuery(getTrailerQuery(args));

export const getTrailerLoader = (args: Args) => async () => {
  const query = getTrailerQuery(args);
  return ((await queryClient.getQueryData(videoKeys.trailer)) ??
    (await queryClient.fetchQuery(query))) as Response['data']['results'];
};
