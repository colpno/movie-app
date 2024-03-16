import { Outlet } from 'react-router-dom';

import Navbar from '~/components/Navbar/Navbar';

function HomeLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default HomeLayout;
