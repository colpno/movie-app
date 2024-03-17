import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import SelectGenre from '~/components/SelectGenre.tsx';
import { Loader } from '../loader.ts';
import TVContext from '../TVContext.ts';

function TVCategorySelector() {
  const { genres } = useLoaderData() as Loader;
  const { setSelectedGenre } = useContext(TVContext);

  const handleChange = (genreId: string) => {
    const genre = genres.find((genre) => `${genre.id}` === genreId)!;
    setSelectedGenre(genre);
  };

  return <SelectGenre genres={genres} onChange={handleChange} className="ml-20" />;
}

export default TVCategorySelector;
