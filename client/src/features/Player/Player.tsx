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

export default Player;
