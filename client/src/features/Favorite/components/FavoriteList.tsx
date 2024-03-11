import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import Card from '~/components/Card/Card.tsx';
import { Favorite } from '~/types/common.ts';
import { Loader } from '../loader.ts';

function FavoriteList() {
  const { favorites } = useLoaderData() as Loader;
  const [videos, setVideos] = useState<Favorite['video_id'][] | never[]>([]);

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      setVideos(favorites.map((favorite) => favorite.video_id));
    }
  }, [favorites]);

  return (
    <div className="flex flex-wrap gap-4">
      {videos.map((video) => {
        return <Card data={video} key={video.id} />;
      })}
    </div>
  );
}

export default FavoriteList;
