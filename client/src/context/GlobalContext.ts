import { createContext } from 'react';

interface GlobalContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export default GlobalContext;
