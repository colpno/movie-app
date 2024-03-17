import { createContext } from 'react';

import { Favorite, Genre, Video } from '~/types/common.ts';

interface ValueType {
  genres: Genre[];
  favorite?: Favorite;
  video: Video;
}

const CardContext = createContext<ValueType>({
  genres: [],
  favorite: undefined,
  video: {} as Video,
});

export default CardContext;
