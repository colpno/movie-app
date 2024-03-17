import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { useGetInfiniteVideos } from '~/apis/video/getInfinite.ts';
import CardSlider from '~/components/CardSlider.tsx';
import LoadMoreButton from '~/components/LoadMoreButton.tsx';
import { divideItemsIntoChunks } from '~/utils/divideVideosIntoChunks.ts';
import MovieContext from '../context/MovieContext.ts';
import { Loader } from '../loader.ts';

function MovieList() {
  const { selectedGenre: genre } = useContext(MovieContext);
  const { genres, favorites } = useLoaderData() as Loader;
  const {
    data: response,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInfiniteVideos({
    mediaType: 'movie',
    params: { with_genres: `${genre?.id}` },
    queryOptions: { enabled: !!genre, queryKey: [genre?.id] },
  });
  const movies = response?.pages.flatMap((page) => page.results) ?? [];
  const movieRows = divideItemsIntoChunks(movies);

  return (
    <div>
      {movieRows.map((chunk, index) => (
        <CardSlider data={chunk} genres={genres} key={`movie-row-${index}`} favorites={favorites} />
      ))}
      <LoadMoreButton onLoad={fetchNextPage} isFetching={isFetchingNextPage} />
    </div>
  );
}

export default MovieList;
