import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import backgroundImage from '~/assets/home.jpg';
import MovieLogo from '~/assets/homeTitle.webp';
import Button from '~/components/Button/Button.tsx';

interface HeroProps {
  className?: string;
}

function Hero({ className }: HeroProps) {
  const navigate = useNavigate();

  return (
    <div className={`relative ${className ?? ''}`}>
      <img src={backgroundImage} alt="background" className="w-screen h-screen brightness-[.6]" />
      <div className="absolute bottom-20">
        <div>
          <img src={MovieLogo} alt="Movie Logo" className="w-full h-full ml-20" />
        </div>
        <div className="flex m-20 gap-8">
          <Button variant="primary" hasLabel size="lg" onClick={() => navigate('/player')}>
            <FaPlay className="mr-2" />
            Play
          </Button>
          <Button variant="secondary" hasLabel size="lg">
            <AiOutlineInfoCircle className="text-[1.8rem] mr-2" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
