import { useMutation } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { emitToast } from '~/utils/toast.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';
import { favoriteKeys } from './queryKey.ts';

export interface UseDeleteFavoriteArgs {
  id: number;
}

export interface UseDeleteFavoriteResponse extends ApiSuccessResponse {
  message: string;
}

const deleteFavorite = async ({ id }: UseDeleteFavoriteArgs) => {
  const BASE_URL = `favorites/${id}`;
  return await axiosClient.delete<never, UseDeleteFavoriteResponse>(BASE_URL);
};

export const useDeleteFavorite = () =>
  useMutation({
    mutationFn: deleteFavorite,
    mutationKey: favoriteKeys.delete(),
    onSuccess: ({ message }) => {
      emitToast(message, 'success');
      queryClient.invalidateQueries({
        queryKey: favoriteKeys.all,
      });
    },
  });
