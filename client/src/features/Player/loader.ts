import { defer } from 'react-router-dom';

import { getTrailerLoader, UseGetTrailersResponse } from '~/apis/video/getTrailer.ts';
import { videoKeys } from '~/apis/video/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';
import { MediaType } from '~/types/common.ts';

export interface PlayerPagePromiseLoader {
  trailers?: Promise<UseGetTrailersResponse['data']['results']>;
}

export type PlayerPageLoader = [UseGetTrailersResponse['data']['results']];

interface Video {
  mediaType: MediaType;
  id: number;
}

const playerPageLoader = async () => {
  const video: Video | undefined = queryClient.getQueryData(videoKeys.inuse());
  const storedTrailer: UseGetTrailersResponse['data']['results'] | undefined =
    queryClient.getQueryData(videoKeys.trailer);

  if (storedTrailer) {
    return defer({
      trailer: storedTrailer[0],
    });
  }

  if (video) {
    const trailerLoader = getTrailerLoader({ mediaType: video.mediaType, id: video.id });
    const trailers = await trailerLoader();

    return defer({
      trailers,
    });
  }

  return {};
};

export default playerPageLoader;
