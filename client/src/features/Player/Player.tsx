import playerPageLoader from '~/features/Player/loader.ts';
import GoBackButton from './components/GoBackButton';
import Video from './components/Video';

function Player() {
  return (
    <div className="bg-black w-screen h-screen">
      <GoBackButton />
      <Video />
    </div>
  );
}

export { Player as Component, playerPageLoader as loader };
