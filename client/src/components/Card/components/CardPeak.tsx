import { memo } from 'react';

import { useGetTrailer } from '~/apis/video/getTrailer.ts';
import PlayerVideo from '~/features/Player/components/PlayerVideo';
import { Video } from '~/types/common.ts';
import { getMediaType } from '~/utils/checkMediaType.ts';
import CardGenres from './CardGenres';
import CardPeakControls from './CardPeakControls';

interface CardPeakProps {
  goToPlayer: () => void;
  video: Video;
}

function CardPeak({ video, goToPlayer }: CardPeakProps) {
  const videoId = video.id;
  const mediaType = getMediaType(video);
  const { data: trailers } = useGetTrailer({
    id: videoId,
    mediaType,
    queryOptions: { queryKey: [mediaType, videoId] },
  });

  return (
    <div className="z-[99] h-max w-80 absolute bottom-0 left-0 rounded-[0.3rem] shadow-[0_3px_10px_rgba(0,0,0,0.75) bg-[#181818] duration-300 ease-in-out">
      <div className="relative h-[140px] h-max-[140px]">
        <PlayerVideo trailers={trailers} />
      </div>
      <div className="flex flex-col p-4 gap-2 text-white w-full">
        <h3 onClick={() => goToPlayer()}>{'title' in video ? video.title : video.name}</h3>
        <CardPeakControls mediaType={mediaType} videoId={videoId} goToPlayer={goToPlayer} />
        <CardGenres video={video} />
      </div>
    </div>
  );
}

export default memo(CardPeak);
