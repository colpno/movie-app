import { useMutation } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { Favorite, MediaType } from '~/types/common.ts';
import { emitToast } from '~/utils/toast.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';
import { favoriteKeys } from './queryKey.ts';

export interface UseCreateFavoriteArgs {
  data: {
    videoId: number;
    mediaType: MediaType;
    userId: number;
  };
}

export interface UseCreateFavoriteResponse extends ApiSuccessResponse {
  message: string;
  data: Favorite;
}

const createFavorite = async ({ data }: UseCreateFavoriteArgs) => {
  const BASE_URL = 'favorites';
  return await axiosClient.post<never, UseCreateFavoriteResponse>(BASE_URL, data);
};

export const useCreateFavorite = () =>
  useMutation({
    mutationFn: createFavorite,
    onSuccess: ({ message, data: newFavorite }) => {
      emitToast(message, 'success');
      queryClient.setQueryData(
        favoriteKeys.detail(newFavorite.media_type, newFavorite.id),
        newFavorite
      );
      queryClient.invalidateQueries({
        queryKey: favoriteKeys.all,
      });
    },
  });
