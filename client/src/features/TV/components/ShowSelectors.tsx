import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import SelectGenre from '~/components/SelectGenre.tsx';
import TVContext from '../context/TVContext.ts';
import { Loader } from '../loader.ts';

function ShowSelectors() {
  const { genres } = useLoaderData() as Loader;
  const { setSelectedGenre } = useContext(TVContext);

  return <SelectGenre genres={genres} onChange={setSelectedGenre} />;
}

export default ShowSelectors;
