import { defer } from 'react-router-dom';

import { favoritesLoader } from '~/apis/favorite/getMultiple.ts';
import { genresLoader } from '~/apis/genre/getMultiple.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';
import { Favorite, Genre, User } from '~/types/common.ts';

export interface MoviePagePromiseLoader {
  genres: Promise<Genre[]>;
  favorites?: Promise<Favorite[]>;
}

export type MoviePageLoader = [Genre[], Favorite[]?];

const moviePageLoader = async () => {
  const mediaType = 'movie';
  const user: User | undefined = queryClient.getQueryData(userKeys.detail);

  const genreLoader = genresLoader({ mediaType });
  const favorites = user ? favoritesLoader({ params: { userId: { eq: user.id } } }) : undefined;

  return defer({
    genres: genreLoader(),
    favorites: favorites ? favorites() : undefined,
  });
};

export default moviePageLoader;
