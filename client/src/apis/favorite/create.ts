import { useMutation } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { Favorite, MediaType } from '~/types/common.ts';
import { emitToast } from '~/utils/toast.ts';
import axiosClient, { SuccessfulResponse } from '../axios.ts';
import { favoriteKeys } from './queryKey.ts';

export interface CreateFavoriteData {
  videoId: number;
  mediaType: MediaType;
  userId: number;
}

export interface Response extends SuccessfulResponse {
  message: string;
  data: Favorite;
}

const createFavorite = async (data: CreateFavoriteData) => {
  const BASE_URL = 'favorites';
  return await axiosClient.post<never, Response>(BASE_URL, data);
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
