import { QueryFunctionContext, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';

export type InfiniteQueryFunctionParams<T extends QueryKey = QueryKey> = QueryFunctionContext<
  T,
  number
>;

export type QueryFunctionParams<T extends QueryKey = QueryKey> = QueryFunctionContext<T>;

export type InfiniteQueryOptions<T> = Partial<
  Omit<
    UseInfiniteQueryOptions<T>,
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
