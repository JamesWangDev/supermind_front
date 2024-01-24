import { toast } from "react-toastify";

export const ToastNotification = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message || "Something went wrong , check api integration");
      break;
    case "warn":
      toast.warn(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast(message);
  }
  return true;
};
