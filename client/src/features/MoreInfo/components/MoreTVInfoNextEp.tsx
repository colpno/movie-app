import { FaRegCalendarAlt } from 'react-icons/fa';

import { TV } from '~/types/common.ts';

interface MoreTVInfoNextEpProps {
  nextEp?: TV['next_episode_to_air'];
}

function MoreTVInfoNextEp({ nextEp }: MoreTVInfoNextEpProps) {
  if (!nextEp) return <></>;

  return (
    <>
      <p>Next Episode:</p>
      <div className="flex gap-x-3 ml-8">
        <div className="flex gap-x-2 items-center">
          <span>{nextEp.air_date}</span>
          <FaRegCalendarAlt />
        </div>
        <span>-</span>
        <div className="flex gap-x-2 items-center">
          <span>Episode: {nextEp.episode_number}</span>
        </div>
        <span>-</span>
        <div className="flex gap-x-2 items-center">
          <span>{nextEp.runtime} minutes</span>
        </div>
      </div>
    </>
  );
}

export default MoreTVInfoNextEp;
