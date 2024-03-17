import { useContext } from 'react';

import { useCreateFavorite } from '~/apis/favorite/create.ts';
import CardContext from '../CardContext.ts';
import FavoredButton from './FavoredButton.tsx';
import UnfavoredButton from './UnfavoredButton.tsx';

function CardPeakFavoriteControl() {
  const { favorite: favoriteBefore, video } = useContext(CardContext);
  const { mutate: addFavorite, data: addResponse } = useCreateFavorite();
  const favorite = addResponse?.data || favoriteBefore;

  if (favorite?.id) return <UnfavoredButton favorite={favorite} />;

  return <FavoredButton video={video} onClick={addFavorite} />;
}

export default CardPeakFavoriteControl;
