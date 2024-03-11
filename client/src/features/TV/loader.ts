import { json } from 'react-router-dom';

import { genresLoader } from '~/apis/genre/getMultiple.ts';
import { videosLoader } from '~/apis/video/getMultiple.ts';
import { DiscoverTV, Genre } from '~/types/common.ts';

export interface Loader {
  tvs: DiscoverTV[];
  genres: Genre[];
}

const tvPageLoader = async () => {
  const mediaType = 'tv';

  const tvPage1Loader = videosLoader({ mediaType });
  const tvPage2Loader = videosLoader({ mediaType, params: { page: 2 } });
  const tvPage3Loader = videosLoader({ mediaType, params: { page: 3 } });
  const genreLoader = genresLoader({ mediaType });

  const [tvPage1, tvPage2, tvPage3, genres] = await Promise.all([
    tvPage1Loader(),
    tvPage2Loader(),
    tvPage3Loader(),
    genreLoader(),
  ]);

  return json({
    tvs: [...tvPage1.data.results, ...tvPage2.data.results, ...tvPage3.data.results],
    genres,
  });
};

export default tvPageLoader;
