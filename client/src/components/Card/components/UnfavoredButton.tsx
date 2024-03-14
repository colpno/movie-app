import { BsCheck } from 'react-icons/bs';

import { useDeleteFavorite } from '~/apis/favorite/delete.ts';
import { Favorite } from '~/types/common.ts';

interface UnfavoredButtonProps {
  favorite: Favorite;
}

function UnfavoredButton({ favorite }: UnfavoredButtonProps) {
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const disfavor = () => {
    if (favorite?.id) deleteFavorite({ id: favorite.id });
  };

  return <BsCheck title="Remove from List" onClick={() => disfavor()} />;
}

export default UnfavoredButton;
