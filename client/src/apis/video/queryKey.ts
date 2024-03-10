import { MediaType } from '~/types/common.ts';
import { Args as GetAllArgs } from './getMultiple.ts';
import { Args as SearchArgs } from './search.ts';

type Filter<T extends MediaType> = GetAllArgs<T>['params'] | SearchArgs<T>['params'];

export const videoKeys = {
  all: (mediaType: MediaType) => [`${mediaType}s`] as const,
  lists: (mediaType: MediaType) => [...videoKeys.all(mediaType), 'list'] as const,
  list: <T extends MediaType>(mediaType: MediaType, filter: Filter<T>) =>
    [...videoKeys.lists(mediaType), filter] as const,
  details: (mediaType: MediaType) => [...videoKeys.all(mediaType), 'detail'] as const,
  detail: (mediaType: MediaType, id: number) => [...videoKeys.details(mediaType), id] as const,
  inuseDetail: (mediaType: MediaType) => [...videoKeys.details(mediaType), 'inuse'] as const,
  trailer: ['trailer'] as const,
};
