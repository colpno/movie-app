import GoBackButton from '~/features/Player/components/GoBackButton.tsx';
import Video from '~/features/Player/components/Video.tsx';
import playerPageLoader from '~/features/Player/loader.ts';

function Player() {
  return (
    <div className="bg-black w-screen h-screen">
      <GoBackButton />
      <Video />
    </div>
  );
}

export { Player as Component, playerPageLoader as loader };
