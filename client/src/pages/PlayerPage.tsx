import { useLoaderData } from 'react-router-dom';

import GoBackButton from '~/features/Player/components/GoBackButton.tsx';
import PlayerVideo from '~/features/Player/components/PlayerVideo.tsx';
import playerPageLoader, { Loader } from '~/features/Player/loader.ts';

function PlayerPage() {
  const { trailers } = useLoaderData() as Loader;

  return (
    <div className="bg-black w-screen h-screen">
      <GoBackButton />
      <PlayerVideo trailers={trailers} />
    </div>
  );
}

export { PlayerPage as Component, playerPageLoader as loader };
