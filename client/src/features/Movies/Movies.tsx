import { useState } from 'react';

import MovieList from './components/MovieList';
import MovieSelectors from './components/MovieSelectors';
import MovieContext from './context/MovieContext.ts';

function Movies() {
  const [genre, setGenre] = useState<string | null>(null);

  return (
    <MovieContext.Provider value={{ genre, setGenre }}>
      <div>
        <MovieSelectors />
        <MovieList />
      </div>
    </MovieContext.Provider>
  );
}

export default Movies;
