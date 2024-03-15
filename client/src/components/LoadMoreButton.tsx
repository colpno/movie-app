import Button from '~/components/Button/Button.tsx';
import useObserver from '~/hooks/userObserver.ts';

interface LoadMoreButtonProps {
  onLoad: () => void;
}

function LoadMoreButton({ onLoad }: LoadMoreButtonProps) {
  const reachEndElement = useObserver<HTMLDivElement>(onLoad);

  return (
    <div ref={reachEndElement}>
      <Button onClick={() => onLoad()}>Load more</Button>{' '}
    </div>
  );
}

export default LoadMoreButton;
