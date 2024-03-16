import Home from '~/features/Home/Home.tsx';
import homePageLoader from '~/features/Home/loader.ts';

function HomePage() {
  return <Home />;
}

export { HomePage as Component, homePageLoader as loader };
