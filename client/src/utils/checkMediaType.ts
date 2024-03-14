import { DiscoverMovie, DiscoverTV, Movie, TV, Video } from '~/types/common.ts';

export function isDiscoverVideo(video: Video): video is DiscoverMovie | DiscoverTV {
  return 'genre_ids' in video;
}

export function isMovieOrTV(video: Video): video is Movie | TV {
  return 'genres' in video;
}

export function isMovie(video: Video): video is Movie {
  return 'release_date' in video;
}

export function isTV(video: Video): video is TV {
  return 'first_air_date' in video;
}

export const getMediaType = (video: Video) => {
  if (isMovie(video)) {
    return 'movie';
  }

  if (isTV(video)) {
    return 'tv';
  }

  throw new Error('Unhandled media type');
};
