import { useContext } from 'react';
import { useAsyncValue } from 'react-router-dom';

import SelectGenre from '~/components/SelectGenre.tsx';
import { TVPageLoader } from '../loader.ts';
import TVContext from '../TVContext.ts';

function TVCategorySelector() {
  const [genres] = useAsyncValue() as TVPageLoader;
  const { setSelectedGenre } = useContext(TVContext);

  const handleChange = (genreId: string) => {
    const genre = genres.find((genre) => `${genre.id}` === genreId)!;
    setSelectedGenre(genre);
  };

  return <SelectGenre genres={genres} onChange={handleChange} />;
}

export default TVCategorySelector;
