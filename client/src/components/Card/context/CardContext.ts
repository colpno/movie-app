import { createContext } from 'react';

import { Genre } from '~/types/common.ts';

interface ValueType {
  genres: Genre[];
}

const CardContext = createContext<ValueType>({
  genres: [],
});

export default CardContext;
