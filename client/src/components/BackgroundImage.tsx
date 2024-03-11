interface BackgroundImageProps {
  src: string;
  className?: string;
}

function BackgroundImage({ src, className }: BackgroundImageProps) {
  return (
    <div className={`h-screen w-screen absolute ${className}`}>
      <img src={src} alt="background" className="h-screen w-screen object-cover" />
    </div>
  );
}

export default BackgroundImage;
