import { useParams } from 'react-router-dom';

import { useGetVideo } from '~/apis/video/getSingle.ts';
import { useGetTrailer } from '~/apis/video/getTrailer.ts';
import PlayerVideo from '~/features/Player/components/PlayerVideo.tsx';
import useGoBackward from '~/hooks/useGoBackward.ts';
import { MediaType } from '~/types/common.ts';
import MoreMovieInfo from '../features/MoreInfo/components/MoreMovieInfo';
import MoreTVInfo from '../features/MoreInfo/components/MoreTVInfo';

function MoreInfo() {
  const { mediaType, videoId } = useParams();
  const goBack = useGoBackward();

  const media = mediaType as MediaType;
  const id = videoId ? parseInt(videoId) : 0;

  const { data: video } = useGetVideo({
    id,
    mediaType: media,
  });

  const { data: trailers } = useGetTrailer({ id, mediaType: media });

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
