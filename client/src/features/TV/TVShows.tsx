import { useState } from 'react';

import Shows from './components/Shows.tsx';
import ShowSelectors from './components/ShowSelectors.tsx';
import TVContext from './context/TVContext.ts';

function TVShows() {
  const [genre, setGenre] = useState<string | null>(null);

  return (
    <TVContext.Provider value={{ genre, setGenre }}>
      <div>
        <ShowSelectors />
        <Shows />
      </div>
    </TVContext.Provider>
  );
}

export default TVShows;
