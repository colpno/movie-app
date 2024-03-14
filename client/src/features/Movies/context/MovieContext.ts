import { createContext } from 'react';

import { Genre } from '~/types/common.ts';

interface MovieContextType {
  selectedGenre: Genre | null;
  setSelectedGenre: (genre: Genre) => void;
}

export const movieContextStates: MovieContextType = {
  selectedGenre: null,
  setSelectedGenre: () => {},
};

const MovieContext = createContext<MovieContextType>(movieContextStates);

export default MovieContext;
