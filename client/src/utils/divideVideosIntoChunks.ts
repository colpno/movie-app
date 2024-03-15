import { DiscoverMovie, DiscoverTV } from '~/types/common.ts';

export const divideDiscoverVideosIntoChunks = (
  array: DiscoverMovie[] | DiscoverTV[],
  itemsPerChunk = 10
) => {
  const chunks = [];

  for (let i = 0; i < array.length; i += itemsPerChunk) {
    chunks.push(array.slice(i, i + itemsPerChunk));
  }

  return chunks;
};
