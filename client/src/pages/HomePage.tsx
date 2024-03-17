import Hero from '~/features/Home/components/Hero.tsx';
import HomeContent from '~/features/Home/components/HomeContent.tsx';
import homePageLoader from '~/features/Home/loader.ts';

function HomePage() {
  return (
    <>
      <Hero className="-mt-[var(--navbar-height)] hero" />
      <HomeContent />
    </>
  );
}

export { HomePage as Component, homePageLoader as loader };
