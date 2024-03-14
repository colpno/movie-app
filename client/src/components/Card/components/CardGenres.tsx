import { ReactNode } from 'react';

import { Video } from '~/types/common.ts';
import { isDiscoverVideo, isMovieOrTV } from '~/utils/checkMediaType.ts';
import CardPeakDiscoverGenre from './CardDiscoverGenres.tsx';
import { SeparatorGenre } from './CardGenre.tsx';

function Wrapper({ children }: { children: ReactNode[] }) {
  return (
    <div className="flex w-full">
      <ul className="flex gap-2 w-full overflow-auto">{children}</ul>
    </div>
  );
}

function CardGenres({ video }: { video: Video }) {
  if (isDiscoverVideo(video)) {
    // DiscoverMovie | DiscoverTV
    return (
      <Wrapper>
        {video.genre_ids.map((genreId, index) => (
          <CardPeakDiscoverGenre
            genreIdFromVideo={genreId}
            index={index}
            key={`${video.id}-genre-${genreId}`}
          />
        ))}
      </Wrapper>
    );
  }

  if (isMovieOrTV(video)) {
    // Movie | TV
    return (
      <Wrapper>
        {video.genres.map((genre, index) => (
          <SeparatorGenre genre={genre} index={index} key={`${video.id}-genre-${genre.id}`} />
        ))}
      </Wrapper>
    );
  }

  throw new Error('Invalid video type');
}

export default CardGenres;
