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
    <div className="flex flex-col gap-4 relative py-[clamp(1rem,2vw,2rem)]">
      {title && <h1 className="ml-[50px] text-[clamp(1.4rem,4vw,2.25rem)] text-white">{title}</h1>}
      <div>
        <Slider
          className="mx-[50px] pr-[50px]"
          slidesToShow={6.2}
          infinite={false}
          draggable={false}
          slidesToScroll={6}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 4.2, slidesToScroll: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3.2, slidesToScroll: 3 } },
            { breakpoint: 640, settings: { slidesToShow: 2.2, slidesToScroll: 2 } },
            { breakpoint: 324, settings: { slidesToShow: 1.2, slidesToScroll: 1 } },
          ]}
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
