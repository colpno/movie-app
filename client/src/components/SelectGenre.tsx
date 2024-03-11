import { memo, useState } from 'react';

import { useGetVideos } from '~/apis/video/getMultiple.ts';
import { Genre, MediaType } from '~/types/common.ts';

interface SelectGenreProps {
  genres: Genre[];
  mediaType: MediaType;
}

function SelectGenre({ genres, mediaType }: SelectGenreProps) {
  const [genre, setGenre] = useState({ label: genres[0].name, value: `${genres[0].id}` });

  useGetVideos({
    mediaType,
    params: {
      with_genres: genre.value,
    },
  });

  const handleChange = (newValue: string) => {
    const label = genres.find((gen) => `${gen.id}` === newValue)!.name;
    setGenre({ label, value: newValue });
  };

  return (
    <select
      className="flex ml-20 cursor-pointer text-[1.4rem] bg-[#00000066] text-white"
      value={genre.value}
      onChange={(e) => handleChange(e.target.value)}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </select>
  );
}

export default memo(SelectGenre);
