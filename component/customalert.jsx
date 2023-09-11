import { toast } from 'react-toastify';

const customAlert = (message, type = 'info') => {
  switch (type) {
    case 'success':
      toast.success(message, { toastClassName: 'custom-alert' });
      break;
    case 'warning':
      toast.warning(message, { toastClassName: 'custom-alert' });
      break;
    case 'error':
      toast.error(message, { toastClassName: 'custom-alert' });
      break;
    default:
      toast.info(message, { toastClassName: 'custom-alert' });
      break;
  }
};

export default customAlert;
