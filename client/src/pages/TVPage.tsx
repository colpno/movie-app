import tvPageLoader from '~/features/TV/loader.ts';
import TVShows from '~/features/TV/TVShows.tsx';

function TVShowPage() {
  return <TVShows />;
}

export { TVShowPage as Component, tvPageLoader as loader };
