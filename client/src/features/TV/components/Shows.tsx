import { useLoaderData } from 'react-router-dom';

import CardSlider from '~/components/CardSlider.tsx';
import { Loader } from '../loader.ts';

function Shows() {
  const { tvs, genres } = useLoaderData() as Loader;

  const getMoviesFromRange = (from: number, to: number) => {
    return tvs.slice(from, to);
  };

  return (
    <div>
      {tvs.length ? (
        <>
          <CardSlider data={getMoviesFromRange(0, 10)} title="Trending Now" genres={genres} />
          <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" genres={genres} />
          <CardSlider
            data={getMoviesFromRange(20, 30)}
            title="Blockbuster Movies"
            genres={genres}
          />
          <CardSlider
            data={getMoviesFromRange(30, 40)}
            title="Popular on Netflix"
            genres={genres}
          />
          <CardSlider data={getMoviesFromRange(40, 50)} title="Action Movies" genres={genres} />
          <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" genres={genres} />
        </>
      ) : (
        <h1 className="text-center mt-16">
          No TV Shows avaialble for the selected genre. Please select a different genre.
        </h1>
      )}
    </div>
  );
}
export default Shows;
