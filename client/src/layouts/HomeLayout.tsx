import { Outlet } from 'react-router-dom';

import Navbar from '~/components/Navbar/Navbar';

function HomeLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-black pt-[var(--navbar-height)] min-h-screen [&>*:not(.hero)]:w-[1280px] [&>*:not(.hero)]:mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default HomeLayout;
