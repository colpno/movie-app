import { toast } from 'react-toastify';

type Mode = 'success' | 'error' | 'info' | 'warning';

export const emitToast = (message: string, mode: Mode) => {
  switch (mode) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    case 'info':
      toast.info(message);
      break;
    default:
      toast.success(message);
      break;
  }
};
