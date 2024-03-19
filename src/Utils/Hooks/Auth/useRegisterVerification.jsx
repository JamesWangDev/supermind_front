import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import request from "../../AxiosUtils";
import { verifyRegisterCode } from "../../AxiosUtils/API";
import { ToastNotification } from "../../CustomFunctions/ToastNotification";

const useRegisterVerification = () => {
  const router = useRouter();
  return useMutation((data) => request({ url: verifyRegisterCode, method: "post", data }), {
    onSuccess: (responseData, requestData) => {
      if (responseData.status === 200) {
        Cookies.set('uo', requestData?.token)
        router.push("/home");
        ToastNotification("success", responseData.data.message);
      }
    },
  });
};
export default useRegisterVerification;
