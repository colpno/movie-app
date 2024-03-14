import { memo } from 'react';

import { Response } from '~/apis/video/getTrailer.ts';
import { Trailer } from '~/types/common.ts';

interface PlayerVideoProps {
  trailers?: Response['data']['results'];
  className?: string;
}

function PlayerVideo({ trailers, className }: PlayerVideoProps) {
  if (!trailers || trailers.length <= 0) return <span>Nothing</span>;

  const getSource = ({ site, key }: Trailer) => {
    switch (site.toLowerCase()) {
      case 'youtube':
        return `https://www.youtube.com/embed/${key}`;
      default:
        return '';
    }
  };

  const trailer = trailers[0];
  const source = getSource(trailer);

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
