import { FaRegCalendarAlt } from 'react-icons/fa';

import { TV } from '~/types/common.ts';

interface MoreTVInfoPreviousEpProps {
  lastEp: TV['last_episode_to_air'];
}

function MoreTVInfoPreviousEp({ lastEp }: MoreTVInfoPreviousEpProps) {
  return (
    <>
      <p>Previous Episode:</p>
      <div className="flex gap-x-3 ml-8">
        <div className="flex gap-x-2 items-center">
          <span>{lastEp.air_date}</span>
          <FaRegCalendarAlt />
        </div>
        <span>-</span>
        <div className="flex gap-x-2 items-center">
          <span>Episode: {lastEp.episode_number}</span>
        </div>
        <span>-</span>
        <div className="flex gap-x-2 items-center">
          <span>{lastEp.runtime} minutes</span>
        </div>
      </div>
    </>
  );
}

export default MoreTVInfoPreviousEp;
