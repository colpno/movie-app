import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
  const theme = 'light';

  return (
    <ToastContainer
      theme={theme}
      position="bottom-right"
      autoClose={5000}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      transition={Bounce}
      hideProgressBar={false}
      draggable={false}
      rtl={false}
    />
  );
}

export default Toast;
