import { useMutation } from '@tanstack/react-query';

import { User } from '~/types/common.ts';
import { emitToast } from '~/utils/toast.ts';
import axiosClient, { SuccessfulResponse } from '../axios.ts';

export interface RegisterData {
  email: string;
  password: string;
}

export interface Response extends SuccessfulResponse {
  message: string;
  data: User;
}

const register = async (data: RegisterData) => {
  const BASE_URL = 'auth/register';
  return await axiosClient.post<never, Response>(BASE_URL, data);
};

export const useRegister = () =>
  useMutation({
    mutationFn: register,
    onSuccess: ({ message }) => {
      emitToast(message, 'success');
    },
  });
