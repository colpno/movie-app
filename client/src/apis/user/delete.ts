import { useMutation } from '@tanstack/react-query';

import axiosClient, { SuccessfulResponse } from '~/apis/axios.ts';
import queryClient from '~/lib/react-query/client.ts';
import { User } from '~/types/common.ts';
import { emitToast } from '~/utils/toast.ts';
import { userKeys } from './queryKey.ts';

export interface Args {
  id: number;
}

export interface Response extends SuccessfulResponse {
  message: string;
  data: User;
}

const deleteUser = async ({ id }: Args) => {
  const BASE_URL = `users/$${id}`;
  return await axiosClient.delete<never, Response>(BASE_URL);
};

export const useDeleteUser = (args: Args) =>
  useMutation({
    mutationFn: async () => await deleteUser(args),
    onSuccess: ({ message }) => {
      emitToast(message, 'success');
      queryClient.removeQueries({
        queryKey: userKeys.detail,
      });
    },
  });
