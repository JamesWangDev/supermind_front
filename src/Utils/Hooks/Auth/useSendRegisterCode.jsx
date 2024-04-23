import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import request from '../../AxiosUtils';
import { sendRegisterCode } from '../../AxiosUtils/API';
import { ToastNotification } from '../../CustomFunctions/ToastNotification';

const useSendRegisterCode = () => {
  const router = useRouter();
  return useMutation((data) => request({ url: sendRegisterCode, method: 'post', data }), {
    onSuccess: (responseData, requestData) => {
      if (responseData.status === 200 || responseData.status === 201) {
        ToastNotification('success', responseData.data.message);
        Cookies.set('ue', requestData.email);
        router.push('/auth/register-verification');
      }
    },
  });
};
export default useSendRegisterCode;
