import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { useGetInfiniteVideos } from '~/apis/video/getInfinite.ts';
import Card from '~/components/Card/Card.tsx';
import LoadMoreButton from '~/components/LoadMoreButton.tsx';
import TVContext from '../context/TVContext.ts';
import { Loader } from '../loader.ts';
import NoTVShows from './NoTVShow.tsx';

function Shows() {
  const { genres, favorites } = useLoaderData() as Loader;
  const { selectedGenre: genre } = useContext(TVContext);
  const {
    data: response,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInfiniteVideos({
    mediaType: 'tv',
    params: { with_genres: `${genre?.id || ''}` },
    queryOptions: { enabled: !!genre?.id, queryKey: [genre?.id] },
  });
  const tvs = response?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div>
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
export default Shows;
