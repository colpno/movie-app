import { createContext } from 'react';

interface TVContextType {
  genre: string | null;
  setGenre: (genre: string) => void;
}

const TVContext = createContext<TVContextType>({
  genre: null,
  setGenre: () => {},
});

export default TVContext;
