import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { useGetInfiniteVideos } from '~/apis/video/getInfinite.ts';
import Button from '~/components/Button/Button.tsx';
import CardSlider from '~/components/CardSlider.tsx';
import useObserver from '~/hooks/userObserver.ts';
import MovieContext from '../context/MovieContext.ts';
import { Loader } from '../loader.ts';

function MovieList() {
  const { genre } = useContext(MovieContext);
  const { genres } = useLoaderData() as Loader;
  const {
    data: response,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInfiniteVideos({
    mediaType: 'movie',
    params: { with_genres: genre! },
    queryOptions: { enabled: !!genre },
  });
  const movies = response?.pages.flatMap((page) => page.results) ?? [];
  const reachEndElement = useObserver<HTMLDivElement>(fetchNextPage);

  // Divide movies into chunks of 10
  const movieChunks = [];
  for (let i = 0; i < movies.length; i += 10) {
    movieChunks.push(movies.slice(i, i + 10));
  }

  return (
    <div>
      {movieChunks.map((chunk, index) => (
        <CardSlider key={index} data={chunk} genres={genres} />
      ))}

      <div ref={reachEndElement}>
        {isFetchingNextPage ? (
          <div>Loading...</div>
        ) : (
          <Button onClick={() => fetchNextPage()}>Load More</Button>
        )}
      </div>
    </div>
  );
}

export default MovieList;
