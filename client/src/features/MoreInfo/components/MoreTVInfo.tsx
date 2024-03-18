import { memo } from 'react';

import CardGenres from '~/components/Card/components/CardGenres.tsx';
import { TV } from '~/types/common.ts';
import MoreInfoRating from './MoreInfoRating.tsx';
import MoreTVInfoNextEp from './MoreTVInfoNextEp.tsx';
import MoreTVInfoPreviousEp from './MoreTVInfoPreviousEp.tsx';

interface MoreTVInfoProps {
  video: TV;
}

function MoreTVInfo({ video }: MoreTVInfoProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-4xl">{video.name}</h2>
      <div className="flex gap-x-3">
        <div className="flex gap-x-2 items-center">
          <span>Total Episodes: {video.number_of_episodes}</span>
        </div>
        <span>-</span>
        <div className="flex gap-x-2 items-center">
          <span>{video.vote_count} votes</span>
        </div>
        <span>-</span>
        <MoreInfoRating rate={video.vote_average} />
      </div>
      <div className="mb-4">
        <CardGenres video={video} />
      </div>
      <MoreTVInfoPreviousEp lastEp={video.last_episode_to_air} />
      <MoreTVInfoNextEp nextEp={video.next_episode_to_air} />
      <div className="line-clamp-6 mt-4">{video.overview}</div>
    </div>
  );
}

export default memo(MoreTVInfo);
