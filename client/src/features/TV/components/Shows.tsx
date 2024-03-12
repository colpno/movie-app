import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { useGetInfiniteVideos } from '~/apis/video/getInfinite.ts';
import Button from '~/components/Button/Button.tsx';
import CardSlider from '~/components/CardSlider.tsx';
import useObserver from '~/hooks/userObserver.ts';
import { Genre } from '~/types/common.ts';
import TVContext from '../context/TVContext.ts';

interface Loader {
  genres: Genre[];
}

function Shows() {
  const { genre } = useContext(TVContext);
  const { genres } = useLoaderData() as Loader;
  const {
    data: response,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInfiniteVideos({
    mediaType: 'tv',
    params: { with_genres: genre! },
    queryOptions: { enabled: !!genre },
  });
  const tvs = response?.pages.flatMap((page) => page.results) ?? [];
  const reachEndElement = useObserver<HTMLDivElement>(fetchNextPage);

  // Divide tvs into chunks of 10
  const tvChunks = [];
  for (let i = 0; i < tvs.length; i += 10) {
    tvChunks.push(tvs.slice(i, i + 10));
  }

  return (
    <div>
      {tvs.length > 0 ? (
        tvChunks.map((chunk, index) => (
          <CardSlider data={chunk} genres={genres} key={`tv-row-${index}`} />
        ))
      ) : (
        <h1 className="text-center mt-16">
          No TV Shows avaialble for the selected genre. Please select a different genre.
        </h1>
      )}
      {isFetchingNextPage ? (
        <div>Loading...</div>
      ) : (
        <div ref={reachEndElement}>
          <Button onClick={() => fetchNextPage()}>Load more</Button>{' '}
        </div>
      )}
    </div>
  );
}
export default Shows;
