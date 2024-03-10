import { createContext } from 'react';

import { Response } from '~/apis/video/getTrailer.ts';

type Trailer = Response['data']['results'][0] | null;

interface GlobalContextType {
  trailer: Trailer;
  setTrailer: (trailer: Trailer) => void;
}

export const globalStates: GlobalContextType = {
  trailer: null,
  setTrailer: () => {},
};

const GlobalContext = createContext<GlobalContextType>(globalStates);

export default GlobalContext;
