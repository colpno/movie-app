import { json } from 'react-router-dom';

import { getTrailerLoader, Response } from '~/apis/video/getTrailer.ts';
import { videoKeys } from '~/apis/video/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';
import { MediaType } from '~/types/common.ts';

interface Video {
  mediaType: MediaType;
  id: number;
}

const playerPageLoader = async () => {
  const video: Video | undefined = queryClient.getQueryData(videoKeys.inuse());
  const storedTrailer: Response['data']['results'] | undefined = queryClient.getQueryData(
    videoKeys.trailer
  );

  if (storedTrailer) {
    return json({
      trailer: storedTrailer[0],
    });
  }

  if (video) {
    const trailerLoader = getTrailerLoader({ mediaType: video.mediaType, id: video.id });
    const trailers = await trailerLoader();

    return json({
      trailers,
    });
  }

  return {};
};

export default playerPageLoader;
