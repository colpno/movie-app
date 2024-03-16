import playerPageLoader from '~/features/Player/loader.ts';
import Player from '~/features/Player/Player.tsx';

function PlayerPage() {
  return <Player />;
}

export { PlayerPage as Component, playerPageLoader as loader };
