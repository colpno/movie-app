import { useState } from 'react';

import TVCategorySelector from '~/features/TV/components/TVCategorySelector.tsx';
import TVShowList from '~/features/TV/components/TVShowList.tsx';
import tvPageLoader from '~/features/TV/loader.ts';
import TVContext from '~/features/TV/TVContext.ts';
import { Genre } from '~/types/common.ts';

function TVShowPage() {
  const [genre, setGenre] = useState<Genre | null>(null);

  return (
    <TVContext.Provider value={{ selectedGenre: genre, setSelectedGenre: setGenre }}>
      <div>
        <TVCategorySelector />
        <TVShowList />
      </div>
    </TVContext.Provider>
  );
}

export { TVShowPage as Component, tvPageLoader as loader };
