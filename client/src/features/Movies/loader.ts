import { json } from 'react-router-dom';

import { favoritesLoader } from '~/apis/favorite/getMultiple.ts';
import { genresLoader } from '~/apis/genre/getMultiple.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';
import { Favorite, Genre, User } from '~/types/common.ts';

export interface Loader {
  genres: Genre[];
  favorites?: Favorite[];
}

const moviePageLoader = async () => {
  const mediaType = 'movie';
  const user: User | undefined = queryClient.getQueryData(userKeys.detail);

  const genreLoader = genresLoader({ mediaType });
  const favorites = user
    ? await favoritesLoader({ params: { userId: { eq: user.id } } })()
    : undefined;

  const genres = await genreLoader();

  return json({
    genres,
    favorites,
  });
};

export default moviePageLoader;
