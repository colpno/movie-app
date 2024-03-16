interface BackgroundImageProps {
  src: string;
  className?: string;
}

function BackgroundImage({ src, className }: BackgroundImageProps) {
  return (
    <div className={className}>
      <img src={src} alt="background" className="h-full w-full object-cover" />
    </div>
  );
}

export default BackgroundImage;
