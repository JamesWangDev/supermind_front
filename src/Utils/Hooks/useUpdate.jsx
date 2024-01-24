import { useMutation } from '@tanstack/react-query';
import request from '../AxiosUtils';
import SuccessHandle from '../CustomFunctions/SuccessHandle';
import { useRouter } from 'next/navigation';

const useUpdate = (url, updateId, path, message, extraFunction) => {
  const router = useRouter();
  return useMutation((data) => request({ url: `${url}/${Array.isArray(updateId) ? updateId.join('/') : updateId}`, method: 'put', data }), {
    onSuccess: (resData) => {
      SuccessHandle(resData, router, path, message);
      extraFunction && extraFunction(resData);
    },
  });
};
export default useUpdate;
