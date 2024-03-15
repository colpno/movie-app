import { useMutation } from '@tanstack/react-query';

import axiosClient, { SuccessfulResponse } from '~/apis/axios.ts';
import queryClient from '~/lib/react-query/client.ts';
import { User } from '~/types/common.ts';
import { emitToast } from '~/utils/toast.ts';
import { userKeys } from './queryKey.ts';

export interface UseDeleteUserArgs {
  id: number;
}

export interface UseDeleteUserResponse extends SuccessfulResponse {
  message: string;
  data: User;
}

const deleteUser = async ({ id }: UseDeleteUserArgs) => {
  const BASE_URL = `users/$${id}`;
  return await axiosClient.delete<never, UseDeleteUserResponse>(BASE_URL);
};

export const useDeleteUser = (args: UseDeleteUserArgs) =>
  useMutation({
    mutationFn: async () => await deleteUser(args),
    onSuccess: ({ message }) => {
      emitToast(message, 'success');
      queryClient.removeQueries({
        queryKey: userKeys.detail,
      });
    },
  });
