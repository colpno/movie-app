import { useContext } from 'react';
import { useAsyncValue } from 'react-router-dom';

import SelectGenre from '~/components/SelectGenre.tsx';
import { MoviePageLoader } from '../loader.ts';
import MovieContext from '../MovieContext.ts';

function MovieSelectors() {
  const { setSelectedGenre } = useContext(MovieContext);
  const [genres] = useAsyncValue() as MoviePageLoader;

  const handleChange = (genreId: string) => {
    const genre = genres.find((genre) => `${genre.id}` === genreId)!;
    setSelectedGenre(genre);
  };

  return <SelectGenre genres={genres} onChange={handleChange} />;
}

export default MovieSelectors;
