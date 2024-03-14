import { BiChevronDown } from 'react-icons/bi';
import { IoPlayCircleSharp } from 'react-icons/io5';

import CardPeakFavoriteControl from './CardPeakFavoriteControl.tsx';

interface CardPeakControlProps {
  goToPlayer: () => void;
}

function CardPeakControls({ goToPlayer }: CardPeakControlProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4 [&>svg]:text-[1.8rem] [&>svg]:cursor-pointer [&>svg]:duration-300 [&>svg]:ease-in-out [&>svg:hover]:text-[#f34242]">
        <IoPlayCircleSharp title="Play" onClick={() => goToPlayer()} />
        <CardPeakFavoriteControl />
      </div>
      <div>
        <BiChevronDown title="More Info" className="text-[2.0rem]" />
      </div>
    </div>
  );
}

export default CardPeakControls;
