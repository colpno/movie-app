import { useMutation } from '@tanstack/react-query';

import { SERVER_URL } from '~/configs/common.ts';
import queryClient from '~/lib/react-query/client.ts';
import { User } from '~/types/common.ts';
import { emitToast } from '~/utils/toast.ts';
import axiosClient, { SuccessfulResponse } from '../axios.ts';
import { userKeys } from '../user/queryKey.ts';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Response extends SuccessfulResponse {
  message: string;
  data: {
    user: User;
    token: string;
  };
}

const login = async (credentials: LoginCredentials) => {
  await axiosClient.get('sanctum/csrf-cookie', { baseURL: `${SERVER_URL}` });
  return await axiosClient.post<never, Response>('auth/login', credentials);
};

export const useLogin = () =>
  useMutation({
    mutationFn: login,
    onSuccess: ({ message, data }) => {
      emitToast(message, 'success');
      queryClient.setQueryData(userKeys.detail, data.user);
    },
  });