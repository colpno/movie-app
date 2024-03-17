import { useState } from 'react';

import { useGetGenres } from '~/apis/genre/getMultiple.ts';
import { useSearchInfiniteVideos } from '~/apis/video/search.ts';
import Card from '~/components/Card/Card.tsx';
import LoadMoreButton from '~/components/LoadMoreButton.tsx';
import Select from '~/components/Select.tsx';
import useDebounce from '~/hooks/useDebounce.ts';
import { MediaType, SearchMovie } from '~/types/common.ts';
import { SelectOption } from '~/types/form.ts';

function SearchPage() {
  const mediaTypeOptions = [
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'tv' },
  ];
  const [selectedMediaType, setSelectedMediaType] = useState(mediaTypeOptions[0].value);
  const { debouncedValue, handleChange, onChangeValue } = useDebounce(300);
  const { data: genres } = useGetGenres({ mediaType: selectedMediaType as MediaType });
  const {
    data: searchResponse,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchInfiniteVideos({
    mediaType: selectedMediaType as MediaType,
    params: { query: debouncedValue },
    queryOptions: { enabled: debouncedValue.length > 0, queryKey: [debouncedValue] },
  });
  const results = searchResponse?.pages.flatMap((page) => page.results as SearchMovie[]) ?? [];

  const handleChangeMediaType = (newOption: SelectOption) => setSelectedMediaType(newOption.value);

  return (
    <div className="text-white">
      <div className="flex gap-4 items-center">
        <Select
          onChange={handleChangeMediaType}
          options={mediaTypeOptions}
          className="bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 h-10 text-lg font-semibold placeholder-gray-500"
        />
        <input
          type="text"
          value={onChangeValue}
          onChange={({ target }) => handleChange(target.value)}
          className="bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 h-10 px-4 text-lg font-semibold placeholder-gray-500"
          autoFocus
        />
      </div>
      {results.length > 0 && (
        <div>
          <div className="grid grid-cols-5 gap-6">
            {results.map((video) => (
              <Card data={video} key={video.id} genres={genres} />
            ))}
          </div>
          <LoadMoreButton onLoad={fetchNextPage} isFetching={isFetchingNextPage} />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
