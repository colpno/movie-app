import { memo, useContext } from 'react';

import { DiscoverMovie, DiscoverTV, Genre as GenreType, Movie, TV } from '~/types/common.ts';
import CardContext from '../context/CardContext.ts';

interface CardPeakGenreProps {
  data: DiscoverMovie | DiscoverTV | Movie | TV;
}

function Genre({ genre }: { genre: GenreType }) {
  return <li className="pr-[0.7rem] first-of-type:list-none">{genre.name}</li>;
}

function Genres({ data }: CardPeakGenreProps) {
  const { genres } = useContext(CardContext);

  if ('genre_ids' in data) {
    return data.genre_ids.map((genreId) => {
      const genre = genres.find((genre) => genre.id === genreId);
      if (genre) return <Genre genre={genre} key={`${data.id}-genre-${genre.id}`} />;
    });
  }

  return data.genres.map((genre) => <Genre genre={genre} key={`${data.id}-genre-${genre.id}`} />);
}

function CardPeakGenres(props: CardPeakGenreProps) {
  return (
    <div className="flex">
      <ul className="flex gap-4">
        <Genres {...props} />
      </ul>
    </div>
  );
}

export default memo(CardPeakGenres);
