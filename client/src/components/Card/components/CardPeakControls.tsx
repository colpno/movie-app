import { BiChevronDown } from 'react-icons/bi';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { path } from '~/constants/routes.ts';
import { MediaType } from '~/types/common.ts';
import CardPeakFavoriteControl from './CardPeakFavoriteControl.tsx';

interface CardPeakControlProps {
  mediaType: string;
  videoId: number;
  goToPlayer: () => void;
}

function CardPeakControls({ mediaType, videoId, goToPlayer }: CardPeakControlProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex gap-4 [&>svg]:text-[1.8rem] [&>svg]:cursor-pointer [&>svg]:duration-300 [&>svg]:ease-in-out [&>svg:hover]:text-[#f34242]">
        <IoPlayCircleSharp title="Play" onClick={() => goToPlayer()} />
        <CardPeakFavoriteControl />
      </div>
      <div>
        <BiChevronDown
          title="More Info"
          className="text-[2.0rem]"
          onClick={() => navigate(path.MORE(mediaType as MediaType, videoId))}
        />
      </div>
    </div>
  );
}

export default CardPeakControls;
