import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import SelectGenre from '~/components/SelectGenre.tsx';
import MovieContext from '../context/MovieContext.ts';
import { Loader } from '../loader.ts';

function MovieSelectors() {
  const { setSelectedGenre } = useContext(MovieContext);
  const { genres } = useLoaderData() as Loader;

  const handleChange = (genreId: string) => {
    const genre = genres.find((genre) => `${genre.id}` === genreId)!;
    setSelectedGenre(genre);
  };

  return <SelectGenre genres={genres} onChange={handleChange} className="ml-20" />;
}

export default MovieSelectors;
