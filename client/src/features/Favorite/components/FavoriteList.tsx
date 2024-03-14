import { useLoaderData } from 'react-router-dom';

import Card from '~/components/Card/Card.tsx';
import { Loader } from '../loader.ts';

function FavoriteList() {
  const { favorites = [] } = useLoaderData() as Loader;

  return (
    <div className="flex flex-wrap gap-4">
      {favorites.map((favorite) => {
        return <Card data={favorite.video_id} key={favorite.id} favorite={favorite} />;
      })}
    </div>
  );
}

export default FavoriteList;
