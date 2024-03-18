import backgroundImage from '~/assets/home.jpg';
import MovieLogo from '~/assets/homeTitle.webp';

interface HeroProps {
  className?: string;
}

function Hero({ className }: HeroProps) {
  return (
    <div className={`relative ${className ?? ''}`}>
      <img src={backgroundImage} alt="background" className="w-screen h-screen brightness-[.6]" />
      <div className="absolute bottom-20">
        <div>
          <img src={MovieLogo} alt="Movie Logo" className="w-full h-full ml-20" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
