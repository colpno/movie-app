import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { MediaType, Trailer } from '~/types/common.ts';
import axiosClient from '../axios.ts';
import { videoKeys } from './queryKey.ts';

type QueryOptions = UseQueryOptions<UseGetTrailersResponse['data']['results']>;

interface GetTrailersArgs {
  mediaType: MediaType;
  id: number;
  signal: AbortSignal;
}

export interface UseGetTrailersArgs extends Omit<GetTrailersArgs, 'signal'> {
  queryOptions?: QueryOptions;
}

export interface UseGetTrailersResponse {
  message: string;
  data: {
    id: number;
    results: Trailer[];
  };
}

const getTrailer = async ({ mediaType, id, signal }: GetTrailersArgs) => {
  const BASE_URL = `${mediaType}/${id}/trailer`;
  return (await axiosClient.get<never, UseGetTrailersResponse>(BASE_URL, { signal })).data.results;
};

export const getTrailerQuery = (args: UseGetTrailersArgs): QueryOptions => ({
  ...args.queryOptions,
  initialData: undefined,
  queryFn: ({ signal }) => getTrailer({ ...args, signal }),
  queryKey: [...videoKeys.trailer, ...[args.queryOptions?.queryKey]],
});

export const useGetTrailer = (args: UseGetTrailersArgs) => useQuery(getTrailerQuery(args));

export const getTrailerLoader = (args: UseGetTrailersArgs) => async () => {
  const query = getTrailerQuery(args);
  return ((await queryClient.getQueryData(videoKeys.trailer)) ??
    (await queryClient.fetchQuery(query))) as UseGetTrailersResponse['data']['results'];
};
