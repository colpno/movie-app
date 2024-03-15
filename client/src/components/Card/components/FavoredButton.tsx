import { AiOutlinePlus } from 'react-icons/ai';

import { UseCreateFavoriteArgs } from '~/apis/favorite/create.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';
import { User, Video } from '~/types/common.ts';

interface FavoredButtonProps {
  video: Video;
  onClick: (args: UseCreateFavoriteArgs) => void;
}

function FavoredButton({ video, onClick }: FavoredButtonProps) {
  const mediaType = 'title' in video ? 'movie' : 'tv';
  const user: User | undefined = queryClient.getQueryData(userKeys.detail);

  const favor = async () => {
    if (user) {
      onClick({
        mediaType,
        userId: user.id,
        videoId: video.id,
      });
    }
  };

  return <AiOutlinePlus title="Add to my list" onClick={favor} />;
}

export default FavoredButton;
