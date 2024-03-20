import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import RouterLoadingWrapper from '~/components/Loading/RouterLoadingWrapper.tsx';
import TVCategorySelector from '~/features/TV/components/TVCategorySelector.tsx';
import TVShowList from '~/features/TV/components/TVShowList.tsx';
import tvPageLoader, { TVPagePromiseLoader } from '~/features/TV/loader.ts';
import TVContext from '~/features/TV/TVContext.ts';
import { Genre } from '~/types/common.ts';

function TVShowPage() {
  const loader = useLoaderData() as TVPagePromiseLoader;
  const [genre, setGenre] = useState<Genre | null>(null);

  return (
    <TVContext.Provider value={{ selectedGenre: genre, setSelectedGenre: setGenre }}>
      <div>
        <RouterLoadingWrapper loaderData={Promise.all(Object.values(loader))}>
          <TVCategorySelector />
          <TVShowList />
        </RouterLoadingWrapper>
      </div>
    </TVContext.Provider>
  );
}

export { TVShowPage as Component, tvPageLoader as loader };
