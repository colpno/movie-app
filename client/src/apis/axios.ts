import axios, { AxiosError, AxiosResponse } from 'axios';

import { API_URL } from '~/configs/common.ts';
import queryClient from '~/lib/react-query/client.ts';
import { userKeys } from './user/queryKey.ts';

interface ApiResponse {
  message?: string;
  data?: unknown;
}

export interface ApiSuccessResponse extends ApiResponse {
  success: boolean;
}

export interface ApiError extends ApiResponse {
  httpCode: number;
  message: string;
}

const axiosClient = axios.create({
  baseURL: `${API_URL}/`,
  withXSRFToken: true,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<ApiResponse>) => {
    const message = error.response?.data.message ?? error.message;
    const code = error.response?.status || 500;

    const errorResponse: ApiError = {
      httpCode: code,
      message,
    };

    throw errorResponse;
  }
);

axiosClient.interceptors.request.use((config) => {
  const token = queryClient.getQueryData(userKeys.apiToken());
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
