import Button from '~/components/Button/Button.tsx';
import useObserver from '~/hooks/userObserver.ts';

interface LoadMoreButtonProps {
  onLoad: () => void;
  isFetching: boolean;
}

function LoadMoreButton({ onLoad, isFetching }: LoadMoreButtonProps) {
  const reachEndElement = useObserver<HTMLDivElement>(onLoad);

  if (isFetching) return <div>Loading...</div>;

  return (
    <div ref={reachEndElement}>
      <Button variant="primary" onClick={() => onLoad()}>
        Load more
      </Button>{' '}
    </div>
  );
}

export default LoadMoreButton;
