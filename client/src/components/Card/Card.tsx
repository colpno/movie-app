import { useQueryClient } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { videoKeys } from '~/apis/video/queryKey.ts';
import logo from '~/assets/logo.png';
import { Favorite, Genre, Video } from '~/types/common.ts';
import CardPeak from './components/CardPeak';
import CardContext from './context/CardContext.ts';

interface CardProps {
  data: Video;
  genres?: Genre[];
  autoSize?: boolean;
  favorite?: Favorite;
}

function Card({ data, genres, autoSize, favorite }: CardProps) {
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);
  const mediaType = 'title' in data ? 'movie' : 'tv';
  const navigate = useNavigate();
  const contextValues = {
    genres: genres ?? [],
    favorite,
    video: data,
  };

  const goToPlayer = () => {
    queryClient.setQueryData(videoKeys.trailer, null);
    queryClient.setQueryData(videoKeys.inuse(), { mediaType, id: data.id });
    navigate('/player');
  };

  return (
    <CardContext.Provider value={contextValues}>
      <div
        className={`max-w-[230px] ${autoSize ? '' : 'w-[230px]'} h-full cursor-pointer relative`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt="card"
          className="rounded-[0.2rem] size-full z-10"
          onClick={() => goToPlayer()}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevents infinite loop if default image also fails to load
            target.src = logo;
          }}
        />
        {isHovered && <CardPeak goToPlayer={goToPlayer} video={data} />}
      </div>
    </CardContext.Provider>
  );
}

export default memo(Card);
