import { useMutation } from '@tanstack/react-query';

import { User } from '~/types/common.ts';
import { emitToast } from '~/utils/toast.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';
import authKeys from './queryKey.ts';

export interface UseRegisterArgs {
  email: string;
  password: string;
}

export interface UseRegisterResponse extends ApiSuccessResponse {
  message: string;
  data: User;
}

const register = async (data: UseRegisterArgs) => {
  const BASE_URL = 'auth/register';
  return await axiosClient.post<never, UseRegisterResponse>(BASE_URL, data);
};

export const useRegister = () =>
  useMutation({
    mutationFn: register,
    mutationKey: authKeys.register,
    onSuccess: ({ message }) => {
      emitToast(message, 'success');
    },
  });
