import { useLoaderData } from 'react-router-dom';

import CardSlider from '~/components/CardSlider.tsx';
import Hero from './components/Hero.tsx';
import { Loader } from './loader.ts';

function Home() {
  const { movies, genres } = useLoaderData() as Loader;

  const getMoviesFromRange = (from: number, to: number) => {
    return movies.slice(from, to);
  };

  return (
    <div>
      <Hero />
      <div>
        <CardSlider data={getMoviesFromRange(0, 10)} title="Trending Now" genres={genres} />
        <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" genres={genres} />
        <CardSlider data={getMoviesFromRange(20, 30)} title="Blockbuster Movies" genres={genres} />
        <CardSlider data={getMoviesFromRange(30, 40)} title="Popular on Netflix" genres={genres} />
        <CardSlider data={getMoviesFromRange(40, 50)} title="Action Movies" genres={genres} />
        <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" genres={genres} />
      </div>
    </div>
  );
}

export default Home;
