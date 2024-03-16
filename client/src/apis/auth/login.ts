import { useMutation } from '@tanstack/react-query';

import { SERVER_URL } from '~/configs/common.ts';
import queryClient from '~/lib/react-query/client.ts';
import { User } from '~/types/common.ts';
import { emitToast } from '~/utils/toast.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';
import { userKeys } from '../user/queryKey.ts';
import authKeys from './queryKey.ts';

export interface UseLoginArgs {
  email: string;
  password: string;
}

export interface UseLoginResponse extends ApiSuccessResponse {
  message: string;
  data: {
    user: User;
    token: string;
  };
}

const login = async (credentials: UseLoginArgs) => {
  await axiosClient.get('sanctum/csrf-cookie', { baseURL: `${SERVER_URL}` });
  return await axiosClient.post<never, UseLoginResponse>('auth/login', credentials);
};

export const useLogin = () =>
  useMutation({
    mutationFn: login,
    mutationKey: authKeys.login,
    onSuccess: ({ message, data }) => {
      emitToast(message, 'success');
      queryClient.setQueryData(userKeys.detail, data.user);
      queryClient.setQueryData(userKeys.apiToken(), data.token);
    },
  });
