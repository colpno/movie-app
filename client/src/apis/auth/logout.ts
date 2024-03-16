import { useMutation } from '@tanstack/react-query';

import { path } from '~/constants/routes.ts';
import queryClient from '~/lib/react-query/client.ts';
import { router } from '~/routes/routes.tsx';
import { emitToast } from '~/utils/toast.ts';
import axiosClient, { ApiSuccessResponse } from '../axios.ts';
import { userKeys } from '../user/queryKey.ts';
import authKeys from './queryKey.ts';

export interface UseLogoutResponse extends ApiSuccessResponse {
  message: string;
}

const logout = () => {
  const BASE_URL = 'auth/logout';
  return axiosClient.post<never, UseLogoutResponse>(BASE_URL);
};

export const useLogout = () =>
  useMutation({
    mutationFn: logout,
    mutationKey: authKeys.logout,
    onSuccess: ({ message }) => {
      emitToast(message, 'success');
      queryClient.removeQueries({
        queryKey: userKeys.detail,
      });
      router.navigate(path.HOME);
    },
  });
