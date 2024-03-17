import { memo, useMemo } from 'react';

import { Genre } from '~/types/common.ts';
import { SelectOption } from '~/types/form.ts';
import Select, { SelectProps } from './Select';

interface SelectGenreProps extends Omit<SelectProps, 'onChange' | 'options'> {
  genres: Genre[];
  onChange: (genreId: string) => void;
}

function SelectGenre({ genres, onChange, ...selectProps }: SelectGenreProps) {
  const selectOptions = useMemo(
    () => genres.map((genre) => ({ label: genre.name, value: `${genre.id}` })),
    [genres]
  );

  const handleChange = (option: SelectOption) => {
    onChange(option.value);
  };

  return <Select {...selectProps} onChange={handleChange} options={selectOptions} />;
}

export default memo(SelectGenre);
