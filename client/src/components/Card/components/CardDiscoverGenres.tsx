import { useContext } from 'react';

import CardContext from '../context/CardContext.ts';
import { SeparatorGenre } from './CardGenre.tsx';

interface CardDiscoverGenresProps {
  genreIdFromVideo: number;
  index: number;
}

function CardPeakDiscoverGenre({ genreIdFromVideo, index }: CardDiscoverGenresProps) {
  const { genres } = useContext(CardContext);
  const genre = genres.find((genre) => genre.id === genreIdFromVideo);

  if (genre) {
    return <SeparatorGenre genre={genre} index={index} />;
  }

  return <></>;
}

export default CardPeakDiscoverGenre;
