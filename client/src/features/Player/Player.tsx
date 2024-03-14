import { useLoaderData } from 'react-router-dom';

import { Response } from '~/apis/video/getTrailer.ts';
import GoBackButton from './components/GoBackButton';
import PlayerVideo from './components/PlayerVideo';

interface Loader {
  trailers?: Response['data']['results'];
}

function Player() {
  const { trailers } = useLoaderData() as Loader;

  return (
    <div className="bg-black w-screen h-screen">
      <GoBackButton />
      <PlayerVideo trailers={trailers} />
    </div>
  );
}

export default Player;
