import { json } from 'react-router-dom';

import { genresLoader } from '~/apis/genre/getMultiple.ts';
import { DiscoverTV, Genre } from '~/types/common.ts';

export interface Loader {
  tvs: DiscoverTV[];
  genres: Genre[];
}

const tvPageLoader = async () => {
  const mediaType = 'tv';

  const genreLoader = genresLoader({ mediaType });

  const genres = await genreLoader();

  return json({
    genres,
  });
};

export default tvPageLoader;
