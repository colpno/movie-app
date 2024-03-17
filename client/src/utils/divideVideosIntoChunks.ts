export const divideItemsIntoChunks = <T>(array: T[], itemsPerChunk = 10) => {
  const chunks = [];

  for (let i = 0; i < array.length; i += itemsPerChunk) {
    chunks.push(array.slice(i, i + itemsPerChunk));
  }

  return chunks;
};
