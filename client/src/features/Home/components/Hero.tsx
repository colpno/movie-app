import backgroundImage from '~/assets/home.jpg';
import MovieLogo from '~/assets/homeTitle.webp';

interface HeroProps {
  className?: string;
}

function Hero({ className }: HeroProps) {
  return (
    <div className={`relative ${className ?? ''} w-screen h-[40rem] lg:h-screen `}>
      <img src={backgroundImage} alt="background" className="w-full h-full brightness-[.6]" />
      <div className="absolute bottom-20">
        <div>
          <img src={MovieLogo} alt="Movie Logo" className="w-[15rem] lg:w-full h-full ml-20" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
