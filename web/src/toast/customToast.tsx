import { toast } from 'react-toastify';
import './customToast.css';

const customToast = {
    success(msg: string, options = {}) {
      return toast.success(msg, {
        ...options,
        className: 'toast-success-container'
      });
    },
    error(msg: string, options = {}) {
      return toast.error(msg, {
        ...options,
        className: 'toast-error-container',
      });
    },
    info(msg: string, options = {}) {
      return toast.info(msg, {
        ...options,
        className: 'toast-info-container',
      });
    },
  };

  export default customToast;