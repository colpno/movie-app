import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { useGetInfiniteVideos } from '~/apis/video/getInfinite.ts';
import Card from '~/components/Card/Card.tsx';
import LoadMoreButton from '~/components/LoadMoreButton.tsx';
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

  return (
    <div>
      <div className="grid grid-cols-5 gap-6">
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
