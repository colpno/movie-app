import { useLoaderData } from 'react-router-dom';

import SelectGenre from '~/components/SelectGenre.tsx';
import { Loader } from '../loader.ts';

function ShowSelectors() {
  const { genres } = useLoaderData() as Loader;

  return <SelectGenre genres={genres} mediaType="tv" />;
}

export default ShowSelectors;
