import { Outlet } from 'react-router-dom';

import Navbar from '~/components/Navbar/Navbar';

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
