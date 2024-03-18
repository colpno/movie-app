import { MediaType } from '~/types/common.ts';

export const path = {
  HOME: '/',
  TV: '/tv',
  MOVIES: '/movies',
  MY_LIST: '/mylist',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PLAYER: '/player',
  SEARCH: '/search',
  MORE: (mediaType?: MediaType, videoId?: number) => {
    if (mediaType && videoId) {
      return `/more/${mediaType}/${videoId}`;
    }
    return '/more/:mediaType/:videoId';
  },
};
