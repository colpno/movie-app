import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { useGetInfiniteVideos } from '~/apis/video/getInfinite.ts';
import CardSlider from '~/components/CardSlider.tsx';
import LoadMoreButton from '~/components/LoadMoreButton.tsx';
import { divideItemsIntoChunks } from '~/utils/divideVideosIntoChunks.ts';
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
  const tvRows = divideItemsIntoChunks(tvs);

  return (
    <div>
      {tvRows.length > 0 ? (
        <>
          {tvRows.map((chunk, index) => (
            <CardSlider
              data={chunk}
              genres={genres}
              key={`tv-row-${index}`}
              favorites={favorites}
            />
          ))}
          <LoadMoreButton onLoad={fetchNextPage} isFetching={isFetchingNextPage} />
        </>
      ) : (
        <NoTVShows />
      )}
    </div>
  );
}
export default Shows;
