import { memo } from 'react';

import {
  DiscoverMovie,
  DiscoverTV,
  Favorite,
  Genre,
  SearchMovie,
  SearchTV,
} from '~/types/common.ts';
import Card from './Card/Card.tsx';
import Slider from './Slider.tsx';

interface CardSliderProps {
  data: DiscoverMovie[] | DiscoverTV[] | SearchMovie[] | SearchTV[];
  title?: string;
  genres?: Genre[];
  favorites?: Favorite[];
}

function CardSlider({ title, data, genres, favorites }: CardSliderProps) {
  return (
    <div className="flex flex-col gap-4 relative py-8">
      {title && <h1 className="ml-[50px] text-4xl text-white">{title}</h1>}
      <div>
        <Slider
          className="mx-[50px] pr-[50px]"
          slidesToShow={6.2}
          infinite={false}
          draggable={false}
          slidesToScroll={6}
        >
          {data.map((movie) => {
            const favorite = favorites?.find((favorite) => favorite.video_id.id == movie.id);
            return (
              <Card key={movie.id} data={movie} genres={genres} favorite={favorite} autoSize />
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default memo(CardSlider);
