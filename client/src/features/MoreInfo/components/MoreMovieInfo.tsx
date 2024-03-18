import { memo } from 'react';
import { FaRegCalendarAlt, FaStar } from 'react-icons/fa';

import CardGenres from '~/components/Card/components/CardGenres.tsx';
import { Movie } from '~/types/common.ts';

interface MoreMovieInfoProps {
  video: Movie;
}

function MoreMovieInfo({ video }: MoreMovieInfoProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-4xl">{video.title}</h2>
      <div className="flex gap-x-3">
        <div className="flex gap-x-2 items-center">
          <span>{video.release_date}</span>
          <FaRegCalendarAlt />
        </div>
        <span>-</span>
        <div className="flex gap-x-2 items-center">
          <span>{video.runtime} minutes</span>
        </div>
      </div>
      <div className="flex gap-x-3">
        <div className="flex gap-x-2 items-center">
          <span>{video.vote_count} votes</span>
        </div>
        <span>-</span>
        <div className="flex gap-x-2 items-center">
          <span>{video.vote_average}</span>
          <FaStar className="text-yellow-500" />
        </div>
      </div>
      <CardGenres video={video} />
      <div className="line-clamp-6 mt-4">{video.overview}</div>
    </div>
  );
}

export default memo(MoreMovieInfo);
