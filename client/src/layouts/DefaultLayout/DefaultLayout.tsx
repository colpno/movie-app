import { Outlet } from 'react-router-dom';

import Navbar from '~/components/Navbar.tsx';

function DefaultLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-black pt-[--navbar-height]">
        <Outlet />
      </main>
    </>
  );
}

export default DefaultLayout;
