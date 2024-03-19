import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { useGetInfiniteVideos } from '~/apis/video/getInfinite.ts';
import Card from '~/components/Card/Card.tsx';
import LoadMoreButton from '~/components/LoadMoreButton.tsx';
import useLoading from '~/hooks/useLoading.ts';
import { Loader } from '../loader.ts';
import TVContext from '../TVContext.ts';
import NoTVShows from './NoTVShow.tsx';

function TVShowList() {
  const { genres, favorites } = useLoaderData() as Loader;
  const { selectedGenre: genre } = useContext(TVContext);
  const {
    data: response,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteVideos({
    mediaType: 'tv',
    params: { with_genres: `${genre?.id || ''}` },
    queryOptions: { enabled: !!genre?.id, queryKey: [genre?.id] },
  });
  const tvs = response?.pages.flatMap((page) => page.results) ?? [];

  useLoading(isLoading);

  return (
    <div className="mt-8">
      {tvs.length > 0 ? (
        <div className="grid grid-cols-5 gap-6">
          {tvs.map((tv, index) => {
            const favorite = favorites?.find((fav) => fav.video_id.id === tv.id);
            return <Card data={tv} genres={genres} key={`tv-row-${index}`} favorite={favorite} />;
          })}
          <LoadMoreButton onLoad={fetchNextPage} isFetching={isFetchingNextPage} />
        </div>
      ) : (
        <NoTVShows />
      )}
    </div>
  );
}
export default TVShowList;
