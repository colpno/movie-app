import moviePageLoader from '~/features/Movies/loader.ts';
import Movies from '~/features/Movies/Movies.tsx';

function MoviePage() {
  return <Movies />;
}

export { MoviePage as Component, moviePageLoader as loader };
