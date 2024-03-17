import { memo } from 'react';

import { getPlayerSource } from '~/utils/getPlayerSource.ts';
import { Loader } from '../loader.ts';

interface PlayerVideoProps {
  trailers?: Loader['trailers'];
  className?: string;
}

function PlayerVideo({ className, trailers }: PlayerVideoProps) {
  if (!trailers || trailers.length <= 0) return <span>Nothing</span>;

  const trailer = trailers[0];
  const source = getPlayerSource(trailer);

  if (!source) return <span>Invalid source</span>;

  return (
    <div className={`flex items-center justify-center size-full ${className}`}>
      <iframe
        width="100%"
        height="100%"
        src={source}
        title={trailer.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default memo(PlayerVideo);
