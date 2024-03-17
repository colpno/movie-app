import { useState } from 'react';

import MovieList from '~/features/Movies/components/MovieList.tsx';
import MovieSelectors from '~/features/Movies/components/MovieSelectors.tsx';
import moviePageLoader from '~/features/Movies/loader.ts';
import MovieContext from '~/features/Movies/MovieContext.ts';
import { Genre } from '~/types/common.ts';

function MoviePage() {
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

export { MoviePage as Component, moviePageLoader as loader };
