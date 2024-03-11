import { memo } from 'react';

import { DiscoverMovie, DiscoverTV, Favorite, Movie, TV } from '~/types/common.ts';
import CardPeakControls from './CardPeakControls';
import CardPeakGenres from './CardPeakGenres';

interface CardPeakProps {
  goToPlayer: () => void;
  data: DiscoverMovie | DiscoverTV | Movie | TV;
  favorite?: Favorite;
}

function CardPeak({ goToPlayer, data, favorite }: CardPeakProps) {
  return (
    <div className="z-[99] h-max w-80 absolute -top-[18vh] left-0 rounded-[0.3rem] shadow-[0_3px_10px_rgba(0,0,0,0.75) bg-[#181818] duration-300 ease-in-out">
      <div className="relative h-[140px]">
        <img
          src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
          alt="card"
          className="w-full h-[140px] object-cover rounded-[0.3rem] top-0 z-[4] absolute"
          onClick={() => goToPlayer()}
        />
      </div>
      <div className="flex flex-col p-4 gap-2 text-white">
        <h3 onClick={() => goToPlayer()}>{'title' in data ? data.title : data.name}</h3>
        <CardPeakControls goToPlayer={goToPlayer} favorite={favorite} data={data} />
        <CardPeakGenres data={data} />
      </div>
    </div>
  );
}

export default memo(CardPeak);
