import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { getVideoQuery } from '~/apis/video/getSingle.ts';
import { getTrailerQuery } from '~/apis/video/getTrailer.ts';
import PlayerVideo from '~/features/Player/components/PlayerVideo.tsx';
import useGoBackward from '~/hooks/useGoBackward.ts';
import useLoading from '~/hooks/useLoading.ts';
import { MediaType } from '~/types/common.ts';
import MoreMovieInfo from '../features/MoreInfo/components/MoreMovieInfo';
import MoreTVInfo from '../features/MoreInfo/components/MoreTVInfo';

function MoreInfo() {
  const { mediaType, videoId } = useParams();
  const goBack = useGoBackward();
  const media = mediaType as MediaType;
  const id = videoId ? parseInt(videoId) : 0;

  const queryResults = useQueries({
    queries: [getVideoQuery({ id, mediaType: media }), getTrailerQuery({ id, mediaType: media })],
  });

  const video = queryResults[0].data;
  const trailers = queryResults[1].data;
  const isLoading = useMemo(() => queryResults.some((query) => query.isLoading), [queryResults]);

  useLoading(isLoading);

  if (!videoId || !mediaType || !video) {
    goBack();
    return;
  }

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8 text-white">
      <PlayerVideo trailers={trailers} className="aspect-video" />
      {'title' in video ? <MoreMovieInfo video={video} /> : <MoreTVInfo video={video} />}
    </div>
  );
}
export default MoreInfo;
