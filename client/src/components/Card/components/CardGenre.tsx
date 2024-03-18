import { GoDotFill } from 'react-icons/go';

import Button from '~/components/Button/Button.tsx';
import { Genre as GenreType } from '~/types/common.ts';

interface GenreProps {
  genre: GenreType;
}

interface SeparatorGenreProps extends GenreProps {
  index: number;
}

export function Genre({ genre }: GenreProps) {
  return (
    <li className="first-of-type:list-none">
      <Button hasLabel variant="text" className="!cursor-default">
        {genre.name}
      </Button>
    </li>
  );
}

export function SeparatorGenre({ genre, index }: SeparatorGenreProps) {
  if (index !== 0) {
    return (
      <>
        <li className="pt-[0.5rem]">
          <GoDotFill className="text-[0.7rem]" />
        </li>
        <Genre genre={genre} />
      </>
    );
  }

  return <Genre genre={genre} />;
}
