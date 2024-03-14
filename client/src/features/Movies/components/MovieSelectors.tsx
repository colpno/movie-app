import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import SelectGenre from '~/components/SelectGenre.tsx';
import MovieContext from '../context/MovieContext.ts';
import { Loader } from '../loader.ts';

function MovieSelectors() {
  const { setSelectedGenre } = useContext(MovieContext);
  const { genres } = useLoaderData() as Loader;

  return <SelectGenre genres={genres} onChange={setSelectedGenre} />;
}

export default MovieSelectors;
