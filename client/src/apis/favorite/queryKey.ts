import { MediaType } from '~/types/common.ts';
import { UseGetFavoritesArgs as GetAllArgs } from './getMultiple.ts';

export const favoriteKeys = {
  all: ['favorites'] as const,
  lists: () => [...favoriteKeys.all, 'list'] as const,
  list: (filter: GetAllArgs['params']) => [...favoriteKeys.lists(), filter] as const,
  details: () => [...favoriteKeys.all, 'detail'] as const,
  detail: (mediaType: MediaType, videoId: number) =>
    [...favoriteKeys.details(), mediaType, videoId] as const,
};
