import { Outlet } from 'react-router-dom';

import Navbar from '~/components/Navbar/Navbar';

function DefaultLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-black pt-[--navbar-height] min-h-screen [&>*]:w-[1280px] [&>*]:mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default DefaultLayout;
