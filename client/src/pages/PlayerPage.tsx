import { useLoaderData } from 'react-router-dom';

import RouterLoadingWrapper from '~/components/Loading/RouterLoadingWrapper.tsx';
import GoBackButton from '~/features/Player/components/GoBackButton.tsx';
import PlayerVideo from '~/features/Player/components/PlayerVideo.tsx';
import playerPageLoader, { PlayerPagePromiseLoader } from '~/features/Player/loader.ts';

function PlayerPage() {
  const { trailers } = useLoaderData() as PlayerPagePromiseLoader;

  return (
    <div className="bg-black w-screen h-screen">
      <GoBackButton />
      <RouterLoadingWrapper loaderData={trailers}>
        {(trailers) => <PlayerVideo trailers={trailers} />}
      </RouterLoadingWrapper>
    </div>
  );
}

export { PlayerPage as Component, playerPageLoader as loader };
