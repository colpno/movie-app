import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import RouterLoadingWrapper from '~/components/Loading/RouterLoadingWrapper.tsx';
import MovieList from '~/features/Movies/components/MovieList.tsx';
import MovieSelectors from '~/features/Movies/components/MovieSelectors.tsx';
import moviePageLoader, { MoviePagePromiseLoader } from '~/features/Movies/loader.ts';
import MovieContext from '~/features/Movies/MovieContext.ts';
import { Genre } from '~/types/common.ts';

function MoviePage() {
  const { genres, favorites } = useLoaderData() as MoviePagePromiseLoader;
  const [genre, setGenre] = useState<Genre | null>(null);

  return (
    <MovieContext.Provider value={{ selectedGenre: genre, setSelectedGenre: setGenre }}>
      <div>
        <RouterLoadingWrapper loaderData={Promise.all([genres, favorites])}>
          <MovieSelectors />
          <MovieList />
        </RouterLoadingWrapper>
      </div>
    </MovieContext.Provider>
  );
}

export { MoviePage as Component, moviePageLoader as loader };
