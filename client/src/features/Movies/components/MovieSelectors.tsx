import { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import SelectGenre from '~/components/SelectGenre.tsx';
import MovieContext from '../context/MovieContext.ts';
import { Loader } from '../loader.ts';

function MovieSelectors() {
  const { setGenre } = useContext(MovieContext);
  const { genres } = useLoaderData() as Loader;

  const handleChange = (genreId: string) => {
    setGenre(genreId);
  };

  useEffect(() => {
    setGenre(genres[0].id.toString());
  }, [genres, setGenre]);

  return <SelectGenre genres={genres} onChange={handleChange} />;
}

export default MovieSelectors;
