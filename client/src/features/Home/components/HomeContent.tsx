import { useAsyncValue } from 'react-router-dom';

import CardSlider from '~/components/CardSlider.tsx';
import { HomePageLoader } from '../loader.ts';

function HomeContent() {
  const [movies, genres, favorites] = useAsyncValue() as HomePageLoader;

  const getMoviesFromRange = (from: number, to: number) => {
    return movies.slice(from, to);
  };

  return (
    <div>
      <CardSlider
        data={getMoviesFromRange(0, 10)}
        title="Trending Now"
        genres={genres}
        favorites={favorites}
      />
      <CardSlider
        data={getMoviesFromRange(10, 20)}
        title="New Releases"
        genres={genres}
        favorites={favorites}
      />
      <CardSlider
        data={getMoviesFromRange(20, 30)}
        title="Blockbuster Movies"
        genres={genres}
        favorites={favorites}
      />
      <CardSlider
        data={getMoviesFromRange(30, 40)}
        title="Popular on Netflix"
        genres={genres}
        favorites={favorites}
      />
      <CardSlider
        data={getMoviesFromRange(40, 50)}
        title="Action Movies"
        genres={genres}
        favorites={favorites}
      />
      <CardSlider
        data={getMoviesFromRange(50, 60)}
        title="Epics"
        genres={genres}
        favorites={favorites}
      />
    </div>
  );
}

export default HomeContent;
