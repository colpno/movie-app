import { memo } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbDownFill, RiThumbUpFill } from 'react-icons/ri';

import { useCreateFavorite } from '~/apis/favorite/create.ts';
import { useDeleteFavorite } from '~/apis/favorite/delete.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';
import { DiscoverMovie, DiscoverTV, Favorite, Movie, TV, User } from '~/types/common.ts';

interface CardPeakControlProps {
  goToPlayer: () => void;
  data: DiscoverMovie | DiscoverTV | Movie | TV;
  favorite?: Favorite;
}

function CardPeakControls({ goToPlayer, data, favorite }: CardPeakControlProps) {
  const mediaType = 'title' in data ? 'movie' : 'tv';
  const user: User | undefined = queryClient.getQueryData(userKeys.detail);
  const deleteFavorite = useDeleteFavorite();
  const addFavorite = useCreateFavorite();

  const favor = async () => {
    if (user) {
      addFavorite.mutate({
        mediaType,
        userId: user.id,
        videoId: data.id,
      });
    }
  };

  const disfavor = () => {
    if (favorite) deleteFavorite.mutate({ id: favorite.id });
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-4 [&>svg]:text-[2rem] [&>svg]:cursor-pointer [&>svg]:duration-300 [&>svg]:ease-in-out [&>svg]:hover:text-[#f34242]">
        <IoPlayCircleSharp title="Play" onClick={() => goToPlayer()} />
        <RiThumbUpFill title="Like" />
        <RiThumbDownFill title="Dislike" />
        {favorite ? (
          <BsCheck title="Remove from List" onClick={() => disfavor()} />
        ) : (
          <AiOutlinePlus title="Add to my list" onClick={favor} />
        )}
      </div>
      <div>
        <BiChevronDown title="More Info" />
      </div>
    </div>
  );
}

export default memo(CardPeakControls);
