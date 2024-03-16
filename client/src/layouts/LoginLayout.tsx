import { Outlet } from 'react-router-dom';

import background from '~/assets/login.jpg';
import BackgroundImage from '~/components/BackgroundImage.tsx';
import Header from '~/components/Header/Header.tsx';

function LoginLayout() {
  return (
    <>
      <Header />
      <BackgroundImage
        src={background}
        className="w-screen h-[calc(100vh-var(--header-height))] absolute brightness-[0.6]"
      />
      <main className="bg-black">
        <Outlet />
      </main>
    </>
  );
}

export default LoginLayout;
