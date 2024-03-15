import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { User } from '~/types/common.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';
import { userKeys } from './queryKey.ts';

type QueryOptions = UseQueryOptions<UseGetUserResponse['data']>;

interface GetUserArgs {
  id: number;
  signal: AbortSignal;
}

export interface UseGetUserArgs extends Omit<GetUserArgs, 'signal'> {
  queryOptions?: Omit<QueryOptions, 'queryKey'>;
}

export interface UseGetUserResponse extends ApiSuccessResponse {
  data?: User;
}

const getUser = async ({ id, signal }: GetUserArgs) => {
  const BASE_URL = `users/${id}`;
  return (await axiosClient.get<never, UseGetUserResponse>(BASE_URL, { signal })).data;
};

const getUserQuery = (args: UseGetUserArgs): QueryOptions => ({
  initialData: undefined,
  queryFn: ({ signal }) => getUser({ ...args, signal }),
  queryKey: userKeys.detail,
  ...args.queryOptions,
});

export const useGetUser = (args: UseGetUserArgs) => useQuery(getUserQuery(args));

export const userLoader = (args: UseGetUserArgs) => async () => {
  const query = getUserQuery(args);
  return ((await queryClient.getQueryData(userKeys.detail)) ??
    (await queryClient.fetchQuery(query))) as UseGetUserResponse['data'];
};
