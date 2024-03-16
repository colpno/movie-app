import { useMutation } from '@tanstack/react-query';

import queryClient from '~/lib/react-query/client.ts';
import { User } from '~/types/common.ts';
import { emitToast } from '~/utils/toast.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';
import { userKeys } from './queryKey.ts';

export interface UseUpdateUserArgs {
  id: number;
  data: User;
}

export interface UseUpdateUserResponse extends ApiSuccessResponse {
  message: string;
  data: User;
}

const updateUser = async ({ id, data }: UseUpdateUserArgs) => {
  const BASE_URL = `users/${id}`;
  return await axiosClient.put<never, UseUpdateUserResponse>(BASE_URL, data);
};

export const useUpdateUser = () =>
  useMutation({
    mutationFn: updateUser,
    mutationKey: userKeys.update(),
    onSuccess: ({ message, data }) => {
      emitToast(message, 'success');
      queryClient.setQueryData(userKeys.detail, data);
    },
  });
