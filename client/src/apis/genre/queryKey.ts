import { MediaType } from '~/types/common.ts';
import { UseGetGenresArgs } from './getMultiple.ts';

export const genreKeys = {
  all: (mediaType: MediaType) => ['genres', mediaType] as const,
  lists: (mediaType: MediaType) => [...genreKeys.all(mediaType), 'list'] as const,
  list: (mediaType: MediaType, filter: UseGetGenresArgs['params']) =>
    [...genreKeys.lists(mediaType), filter] as const,
  details: (mediaType: MediaType) => [...genreKeys.all(mediaType), 'detail'] as const,
  detail: (mediaType: MediaType, id: number) => [...genreKeys.details(mediaType), id] as const,
};
