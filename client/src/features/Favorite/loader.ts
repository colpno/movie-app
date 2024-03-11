import { json } from 'react-router-dom';

import { favoritesLoader } from '~/apis/favorite/getMultiple.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';
import { Favorite, User } from '~/types/common.ts';

export interface Loader {
  favorites?: Favorite[];
}

const favoritePageLoader = async () => {
  const user: User | undefined = queryClient.getQueryData(userKeys.detail);

  if (user) {
    const favoriteLoader = favoritesLoader({ params: { userId: { eq: user.id } } });
    const favorites = await favoriteLoader();

    return json({
      favorites,
    });
  }

  return {};
};

export default favoritePageLoader;
