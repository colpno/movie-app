import { useState } from 'react';

import { Genre } from '~/types/common.ts';
import MovieList from './components/MovieList';
import MovieSelectors from './components/MovieSelectors';
import MovieContext from './context/MovieContext.ts';

function Movies() {
  const [genre, setGenre] = useState<Genre | null>(null);

  return (
    <MovieContext.Provider value={{ selectedGenre: genre, setSelectedGenre: setGenre }}>
      <div>
        <MovieSelectors />
        <MovieList />
      </div>
    </MovieContext.Provider>
  );
}

export default Movies;
