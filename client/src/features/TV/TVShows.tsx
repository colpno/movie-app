import { useState } from 'react';

import { Genre } from '~/types/common.ts';
import Shows from './components/Shows.tsx';
import ShowSelectors from './components/ShowSelectors.tsx';
import TVContext from './context/TVContext.ts';

function TVShows() {
  const [genre, setGenre] = useState<Genre | null>(null);

  return (
    <TVContext.Provider value={{ selectedGenre: genre, setSelectedGenre: setGenre }}>
      <div>
        <ShowSelectors />
        <Shows />
      </div>
    </TVContext.Provider>
  );
}

export default TVShows;
