import { json } from 'react-router-dom';

import { genresLoader } from '~/apis/genre/getMultiple.ts';
import { videosLoader } from '~/apis/video/getMultiple.ts';
import { DiscoverMovie, Genre } from '~/types/common.ts';

export interface Loader {
  movies: DiscoverMovie[];
  genres: Genre[];
}

const moviePageLoader = async () => {
  const mediaType = 'movie';

  const moviePage1Loader = videosLoader({ mediaType });
  const moviePage2Loader = videosLoader({ mediaType, params: { page: 2 } });
  const moviePage3Loader = videosLoader({ mediaType, params: { page: 3 } });
  const genreLoader = genresLoader({ mediaType });

  const [moviePage1, moviePage2, moviePage3, genres] = await Promise.all([
    moviePage1Loader(),
    moviePage2Loader(),
    moviePage3Loader(),
    genreLoader(),
  ]);

  return json({
    movies: [...moviePage1.data.results, ...moviePage2.data.results, ...moviePage3.data.results],
    genres,
  });
};

export default moviePageLoader;
