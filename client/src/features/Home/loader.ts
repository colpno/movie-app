import { json } from 'react-router-dom';

import { genresLoader } from '~/apis/genre/getMultiple.ts';
import { videosLoader } from '~/apis/video/getMultiple.ts';
import { DiscoverMovie, Genre, MediaType } from '~/types/common.ts';

export interface Loader {
  movies: DiscoverMovie[];
  genres: Genre[];
}

const homePageLoader = async () => {
  const mediaType: MediaType = 'movie';

  const videoLoaderPage1 = videosLoader({ mediaType });
  const videoLoaderPage2 = videosLoader({ mediaType, params: { page: 2 } });
  const videoLoaderPage3 = videosLoader({ mediaType, params: { page: 3 } });
  const genreLoader = genresLoader({ mediaType });

  const [moviesPage1, moviesPage2, moviesPage3, genres] = await Promise.all([
    videoLoaderPage1(),
    videoLoaderPage2(),
    videoLoaderPage3(),
    genreLoader(),
  ]);

  return json({
    movies: [...moviesPage1.results, ...moviesPage2.results, ...moviesPage3.results],
    genres,
  });
};

export default homePageLoader;
