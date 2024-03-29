import backgroundImage from '~/assets/home.jpg';
import MovieLogo from '~/assets/homeTitle.webp';

interface HeroProps {
  className?: string;
}

function Hero({ className }: HeroProps) {
  return (
    <div className={`relative ${className ?? ''} w-screen h-[clamp(15rem,80vw,100vh)] `}>
      <img src={backgroundImage} alt="background" className="w-full h-full brightness-[.6]" />
      <div className="absolute bottom-20">
        <div>
          <img
            src={MovieLogo}
            alt="Movie Logo"
            className="w-[clamp(200px,70vw,100%)] ml-[clamp(1rem,8vw,5rem)]"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
