import { Trailer } from '~/types/common.ts';

export const getPlayerSource = ({ site, key }: Trailer) => {
  switch (site.toLowerCase()) {
    case 'youtube':
      return `https://www.youtube.com/embed/${key}`;
    default:
      return '';
  }
};
