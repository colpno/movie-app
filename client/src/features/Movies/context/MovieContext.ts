import { createContext } from 'react';

interface MovieContextType {
  genre: string | null;
  setGenre: (genreId: string) => void;
}

export const movieContextStates: MovieContextType = {
  genre: null,
  setGenre: () => {},
};

const MovieContext = createContext<MovieContextType>(movieContextStates);

export default MovieContext;
