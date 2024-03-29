import { useContext } from 'react';
import { useAsyncValue } from 'react-router-dom';

import { useGetInfiniteVideos } from '~/apis/video/getInfinite.ts';
import Card from '~/components/Card/Card.tsx';
import LoadMoreButton from '~/components/LoadMoreButton.tsx';
import useLoading from '~/hooks/useLoading.ts';
import { MoviePageLoader } from '../loader.ts';
import MovieContext from '../MovieContext.ts';

function MovieList() {
  const { selectedGenre: genre } = useContext(MovieContext);
  const [genres, favorites] = useAsyncValue() as MoviePageLoader;
  const {
    data: response,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteVideos({
    mediaType: 'movie',
    params: { with_genres: `${genre?.id}` },
    queryOptions: { enabled: !!genre, queryKey: [genre?.id] },
  });
  const movies = response?.pages.flatMap((page) => page.results) ?? [];

  useLoading(isLoading);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => {
          const favorite = favorites?.find((fav) => fav.video_id.id === movie.id);
          return (
            <Card data={movie} genres={genres} key={`movie-row-${index}`} favorite={favorite} />
          );
        })}
      </div>
      <LoadMoreButton onLoad={fetchNextPage} isFetching={isFetchingNextPage} />
    </div>
  );
}

export default MovieList;
