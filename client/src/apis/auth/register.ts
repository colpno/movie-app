import { useMutation } from '@tanstack/react-query';

import { User } from '~/types/common.ts';
import { emitToast } from '~/utils/toast.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';

export interface UseRegisterArgs {
  data: {
    email: string;
    password: string;
  };
}

export interface UseRegisterResponse extends ApiSuccessResponse {
  message: string;
  data: User;
}

const register = async ({ data }: UseRegisterArgs) => {
  const BASE_URL = 'auth/register';
  return await axiosClient.post<never, UseRegisterResponse>(BASE_URL, data);
};

export const useRegister = () =>
  useMutation({
    mutationFn: register,
    onSuccess: ({ message }) => {
      emitToast(message, 'success');
    },
  });
