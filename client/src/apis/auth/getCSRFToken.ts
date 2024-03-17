import { SERVER_URL } from '~/configs/common.ts';
import axiosClient from '../axios.ts';

export const getCSRFToken = async () => {
  await axiosClient.get('sanctum/csrf-cookie', { baseURL: `${SERVER_URL}` });
};
