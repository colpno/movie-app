import Favorites from '~/features/Favorite/Favorites.tsx';
import favoritePageLoader from '~/features/Favorite/loader.ts';

function UserListedMoviePage() {
  return <Favorites />;
}

export { UserListedMoviePage as Component, favoritePageLoader as loader };
