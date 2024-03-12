import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import backgroundImage from '~/assets/home.jpg';
import MovieLogo from '~/assets/homeTitle.webp';

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <img
        src={backgroundImage}
        alt="background"
        className="w-screen h-[calc(100vh-var(--navbar-height))] brightness-[.6]"
      />
      <div className="absolute bottom-20">
        <div>
          <img src={MovieLogo} alt="Movie Logo" className="w-full h-full ml-20" />
        </div>
        <div className="flex m-20 gap-8">
          <button
            onClick={() => navigate('/player')}
            className="flex justify-center items-center text-[1.4rem] gap-4 rounded-[0.2rem] p-2 pl-8 pr-[2.4rem] border-none cursor-pointer transition-all duration-200 ease-in-out hover:opacity-80"
          >
            <FaPlay />
            Play
          </button>
          <button className="flex justify-center items-center text-[1.4rem] gap-4 rounded-[0.2rem] p-2 pl-8 pr-[2.4rem] border-none cursor-pointer transition-all duration-200 ease-in-out hover:opacity-80 bg-[#6d6d6eb3] text-white">
            <AiOutlineInfoCircle className="text-[1.8rem]" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
