import { useState } from 'react';

import SearchInput from '~/features/Search/components/SearchInput';
import SearchResults from '~/features/Search/components/SearchResults.tsx';
import useDebounce from '~/hooks/useDebounce.ts';

function SearchPage() {
  const mediaTypeOptions = [
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'tv' },
  ];
  const [selectedMediaType, setSelectedMediaType] = useState(mediaTypeOptions[0].value);
  const { debouncedValue, handleChange, onChangeValue } = useDebounce(300);

  return (
    <div className="text-white">
      <SearchInput
        mediaTypeOptions={mediaTypeOptions}
        onMediaTypeChange={setSelectedMediaType}
        searchValue={onChangeValue}
        onSearchInputChange={handleChange}
      />
      <SearchResults mediaType={selectedMediaType} searchValue={debouncedValue} />
    </div>
  );
}

export default SearchPage;
