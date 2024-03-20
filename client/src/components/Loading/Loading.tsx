import { useEffect } from 'react';

import logo from '~/assets/logo.png';
import LoadingSpinner from './LoadingSpinner';

function Loading() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black z-[1000] flex flex-col items-center justify-center">
      <img src={logo} alt="Logo" className="size-[30vmax] aspect-video" />
      <div className="size-32">
        <LoadingSpinner />
      </div>
    </div>
  );
}

export default Loading;
