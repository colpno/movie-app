import { memo } from 'react';

import Select from '~/components/Form/Select.tsx';
import { SelectOption } from '~/types/form.ts';

interface SearchInputProps {
  onMediaTypeChange: (mediaType: string) => void;
  mediaTypeOptions: SelectOption[];
  onSearchInputChange: (value: string) => void;
  searchValue: string;
}

function SearchInput({
  onMediaTypeChange,
  mediaTypeOptions,
  onSearchInputChange: onInputChange,
  searchValue: inputValue,
}: SearchInputProps) {
  const handleChangeMediaType = (newOption: SelectOption) => onMediaTypeChange(newOption.value);

  return (
    <div className="flex gap-4 items-center">
      <Select
        onChange={handleChangeMediaType}
        options={mediaTypeOptions}
        className="bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 h-10 text-lg font-semibold placeholder-gray-500"
      />
      <input
        type="text"
        value={inputValue}
        onChange={({ target }) => onInputChange(target.value)}
        className="bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 h-10 px-4 text-lg font-semibold placeholder-gray-500"
        autoFocus
      />
    </div>
  );
}

export default memo(SearchInput);
