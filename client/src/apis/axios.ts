import axios, { AxiosError, AxiosResponse } from 'axios';

import { API_URL } from '~/configs/common.ts';
import { emitToast } from '~/utils/toast.ts';

interface RequestResponse {
  message?: string;
  data?: unknown;
}

export interface SuccessfulResponse extends RequestResponse {
  success: boolean;
}

interface ErrorResponse extends RequestResponse {
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
  (error: AxiosError<RequestResponse>): ErrorResponse => {
    const message = error.response?.data.message ?? error.message;
    const code = error.response?.status || 500;
    emitToast(message, 'error');
    return {
      httpCode: code,
      message,
    };
  }
);

export default axiosClient;
