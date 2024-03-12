import { json } from 'react-router-dom';

import { genresLoader } from '~/apis/genre/getMultiple.ts';
import { Genre } from '~/types/common.ts';

export interface Loader {
  genres: Genre[];
}

const moviePageLoader = async () => {
  const mediaType = 'movie';

  const genreLoader = genresLoader({ mediaType });

  const genres = await genreLoader();

  return json({
    genres,
  });
};

export default moviePageLoader;
