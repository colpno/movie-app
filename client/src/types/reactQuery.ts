import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

export type InfiniteQueryFunctionParams<T extends QueryKey = QueryKey> = QueryFunctionContext<
  T,
  number
>;

export type QueryFunctionParams<T extends QueryKey = QueryKey> = QueryFunctionContext<T>;
