import Shows from './components/Shows.tsx';
import ShowSelectors from './components/ShowSelectors.tsx';

function TVShows() {
  return (
    <div>
      <ShowSelectors />
      <Shows />
    </div>
  );
}

export default TVShows;
