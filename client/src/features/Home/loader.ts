import { defer } from 'react-router-dom';

import { favoritesLoader } from '~/apis/favorite/getMultiple.ts';
import { genresLoader } from '~/apis/genre/getMultiple.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import { videosLoader } from '~/apis/video/getMultiple.ts';
import queryClient from '~/lib/react-query/client.ts';
import { DiscoverMovie, Favorite, Genre, MediaType, User } from '~/types/common.ts';

export interface HomePagePromiseLoader {
  movies: Promise<DiscoverMovie[]>;
  genres: Promise<Genre[]>;
  favorites?: Promise<Favorite[]>;
}

export type HomePageLoader = [DiscoverMovie[], Genre[], Favorite[]?];

const homePageLoader = async () => {
  const mediaType: MediaType = 'movie';
  const user: User | undefined = queryClient.getQueryData(userKeys.detail);

  const videoLoaderPage1 = videosLoader({ mediaType });
  const videoLoaderPage2 = videosLoader({ mediaType, params: { page: 2 } });
  const videoLoaderPage3 = videosLoader({ mediaType, params: { page: 3 } });
  const genreLoader = genresLoader({ mediaType });
  const favorites = user ? favoritesLoader({ params: { userId: { eq: user.id } } }) : undefined;

  const [moviesPage1, moviesPage2, moviesPage3] = await Promise.all([
    videoLoaderPage1(),
    videoLoaderPage2(),
    videoLoaderPage3(),
  ]);

  const movies = new Promise((resolve) =>
    resolve([...moviesPage1.results, ...moviesPage2.results, ...moviesPage3.results])
  );

  return defer({
    movies: movies,
    genres: genreLoader(),
    favorites: favorites ? favorites() : undefined,
  });
};

export default homePageLoader;
