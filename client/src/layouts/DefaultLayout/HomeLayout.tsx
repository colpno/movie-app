import { Outlet } from 'react-router-dom';

import Navbar from '~/components/Navbar.tsx';

function HomeLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-black">
        <Outlet />
      </main>
    </>
  );
}

export default HomeLayout;
