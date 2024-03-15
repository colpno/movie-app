import { memo, useMemo } from 'react';

import { Genre } from '~/types/common.ts';
import { SelectOption } from '~/types/form.ts';
import Select from './Select';

interface SelectGenreProps {
  genres: Genre[];
  onChange: (genreId: string) => void;
}

function SelectGenre({ genres, onChange }: SelectGenreProps) {
  const selectOptions = useMemo(
    () => genres.map((genre) => ({ label: genre.name, value: `${genre.id}` })),
    [genres]
  );

  const handleChange = (option: SelectOption) => {
    onChange(option.value);
  };

  return <Select onChange={handleChange} options={selectOptions} />;
}

export default memo(SelectGenre);
