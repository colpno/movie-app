import { useQueryClient } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { videoKeys } from '~/apis/video/queryKey.ts';
import { DiscoverMovie, DiscoverTV, Favorite, Genre, Movie, TV } from '~/types/common.ts';
import CardPeak from './components/CardPeak';
import CardContext from './context/CardContext.ts';

interface CardProps {
  data: DiscoverMovie | DiscoverTV | Movie | TV;
  genres?: Genre[];
  favorite?: Favorite;
  autoSize?: boolean;
}

function Card({ data, genres, favorite, autoSize }: CardProps) {
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);
  const mediaType = 'title' in data ? 'movie' : 'tv';
  const navigate = useNavigate();

  const goToPlayer = () => {
    queryClient.setQueryData(videoKeys.trailer, null);
    queryClient.setQueryData(videoKeys.inuse(), { mediaType, id: data.id });
    navigate('/player');
  };

  return (
    <CardContext.Provider value={{ genres: genres ?? [] }}>
      <div
        className={`max-w-[230px] ${autoSize ? '' : 'w-[230px]'} h-full cursor-pointer relative`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
          alt="card"
          className="rounded-[0.2rem] size-full z-10"
          onClick={() => goToPlayer()}
          loading="lazy"
        />

        {isHovered && <CardPeak goToPlayer={goToPlayer} data={data} favorite={favorite} />}
      </div>
    </CardContext.Provider>
  );
}

export default memo(Card);
