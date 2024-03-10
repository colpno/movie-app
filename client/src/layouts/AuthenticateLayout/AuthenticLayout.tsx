import { Outlet } from 'react-router-dom';

import Header from '~/components/Header.tsx';

function AuthenticLayout() {
  return (
    <>
      <Header />
      <main className="bg-black">
        <Outlet />
      </main>
    </>
  );
}

export default AuthenticLayout;
