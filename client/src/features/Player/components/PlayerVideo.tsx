import { IframeHTMLAttributes, memo } from 'react';

import LoadingSpinner from '~/components/Loading/LoadingSpinner.tsx';
import { getPlayerSource } from '~/utils/getPlayerSource.ts';
import { Loader } from '../loader.ts';

interface PlayerVideoProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  isFetching?: boolean;
  trailers?: Loader['trailers'];
  className?: string;
}

function PlayerVideo({ isFetching, className, trailers, ...iframeProps }: PlayerVideoProps) {
  if (!trailers || trailers.length <= 0) return <span>Invalid source</span>;

  const trailer = trailers[0];
  const source = getPlayerSource(trailer);

  return (
    <div className={`flex items-center justify-center size-full ${className}`}>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={source}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          {...iframeProps}
        ></iframe>
      )}
    </div>
  );
}

export default memo(PlayerVideo);
