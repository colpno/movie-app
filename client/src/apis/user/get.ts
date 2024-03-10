import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { User } from '~/types/common.ts';
import axiosClient, { SuccessfulResponse } from '../axios.ts';
import { userKeys } from './queryKey.ts';

type QueryOptions = UseQueryOptions<Response['data']>;

export interface Args {
  id: number;
  queryOptions?: Omit<QueryOptions, 'queryKey'>;
}

export interface Response extends SuccessfulResponse {
  data?: User;
}

const getUser = async ({ id }: Args) => {
  const BASE_URL = `users/${id}`;
  return (await axiosClient.get<never, Response>(BASE_URL)).data;
};

const getUserQuery = (args: Args): QueryOptions => ({
  initialData: undefined,
  queryFn: () => getUser(args),
  queryKey: userKeys.detail,
  ...args.queryOptions,
});

export const useGetUser = (args: Args) => useQuery(getUserQuery(args));

export const userLoader = (args: Args) => async () => {
  const query = getUserQuery(args);
  return ((await queryClient.getQueryData(userKeys.detail)) ??
    (await queryClient.fetchQuery(query))) as Response['data'];
};
