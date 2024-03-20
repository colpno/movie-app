import { useLoaderData } from 'react-router-dom';

import RouterLoadingWrapper from '~/components/Loading/RouterLoadingWrapper.tsx';
import Hero from '~/features/Home/components/Hero.tsx';
import HomeContent from '~/features/Home/components/HomeContent.tsx';
import homePageLoader, { HomePagePromiseLoader } from '~/features/Home/loader.ts';

function HomePage() {
  const loaderData = useLoaderData() as HomePagePromiseLoader;

  return (
    <>
      <Hero className="-mt-[var(--navbar-height)] hero" />
      <RouterLoadingWrapper loaderData={Promise.all(Object.values(loaderData))}>
        <HomeContent />
      </RouterLoadingWrapper>
    </>
  );
}

export { HomePage as Component, homePageLoader as loader };
