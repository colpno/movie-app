import { memo } from 'react';
import { default as SlickSlider, Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface SliderProps extends Settings {
  children: JSX.Element | JSX.Element[];
}

function Slider({ children, ...options }: SliderProps) {
  return (
    <div className="[&_.slick-list]:mx-[-7px] [&_.slick-slide>div]:px-[10px]">
      <SlickSlider speed={500} slidesToShow={1} slidesToScroll={1} {...options}>
        {children}
      </SlickSlider>
    </div>
  );
}

export default memo(Slider);
