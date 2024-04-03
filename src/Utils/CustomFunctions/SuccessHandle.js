import MessageCreate from "./MessageCreate";
import { ToastNotification } from "./ToastNotification";

const SuccessHandle = (resData, router, path, message, setCouponError, pathName) => {
  if (resData.status === 201 || resData.status === 200) {
    setCouponError && setCouponError('')
    path && router && router.push(path ? path : pathName.slice(0, pathName.slice(1).indexOf("/") + 1));
    {
      message !== 'No' && ToastNotification("success", message ? message : (router && MessageCreate(pathName)));
    }
  } else if (resData.response?.data?.message || resData?.data?.errors[0]?.message) {
    setCouponError && setCouponError(resData.response?.data?.message || resData?.data?.errors[0]?.message)
    { message !== 'No' && ToastNotification("error", resData.response?.data?.message || resData?.data?.errors[0]?.message); }
  } else { message !== 'No' && ToastNotification("error"); }
};

export default SuccessHandle;
