import { memo } from 'react';

import { useGetGenres } from '~/apis/genre/getMultiple.ts';
import { useSearchInfiniteVideos } from '~/apis/video/search.ts';
import Card from '~/components/Card/Card.tsx';
import LoadMoreButton from '~/components/LoadMoreButton.tsx';
import useLoading from '~/hooks/useLoading.ts';
import { MediaType, SearchMovie } from '~/types/common.ts';

interface SearchResultsProps {
  mediaType: string;
  searchValue: string;
}

function SearchResults({ mediaType, searchValue }: SearchResultsProps) {
  const { data: genres } = useGetGenres({ mediaType: mediaType as MediaType });
  const {
    data: searchResponse,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSearchInfiniteVideos({
    mediaType: mediaType as MediaType,
    params: { query: searchValue },
    queryOptions: { enabled: searchValue.length > 0, queryKey: [searchValue] },
  });
  const results = searchResponse?.pages.flatMap((page) => page.results as SearchMovie[]) ?? [];

  useLoading(isLoading);

  return (
    <>
      {results.length > 0 ? (
        <div>
          <div className="grid grid-cols-5 gap-6">
            {results.map((video) => (
              <Card data={video} key={video.id} genres={genres} />
            ))}
          </div>
          <LoadMoreButton onLoad={fetchNextPage} isFetching={isFetchingNextPage} />
        </div>
      ) : (
        <div className="text-center text-2xl font-semibold mt-8">No results found</div>
      )}
    </>
  );
}
export default memo(SearchResults);
