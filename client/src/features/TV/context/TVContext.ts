import { createContext } from 'react';

import { Genre } from '~/types/common.ts';

interface TVContextType {
  selectedGenre: Genre | null;
  setSelectedGenre: (genre: Genre) => void;
}

const TVContext = createContext<TVContextType>({
  selectedGenre: null,
  setSelectedGenre: () => {},
});

export default TVContext;
