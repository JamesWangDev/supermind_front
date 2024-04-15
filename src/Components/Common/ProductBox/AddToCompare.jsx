import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
// import { FiRefreshCw } from 'react-icons/fi';
import useCreate from '@/Utils/Hooks/useCreate';
import { CompareAPI } from '@/Utils/AxiosUtils/API';
import I18NextContext from '@/Helper/I18NextContext';
import CompareContext from '@/Helper/CompareContext';
import Btn from '@/Elements/Buttons/Btn';
import { RiRefreshLine } from 'react-icons/ri';

const AddToCompare = ({ productObj, customClass }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { compareState, setCompareState } = useContext(CompareContext);
  const cookieUAT = Cookies.get('uat');
  const router = useRouter();
  const { data, mutate, isLoading } = useCreate(CompareAPI, false, false, 'Added to Compare List');
  const addToCompare = (productObj) => {
    if (!cookieUAT) {
      router.push(`/${i18Lang}/auth/login`);
    } else {
      mutate({ product_id: productObj?.id });
    }
  };
  useEffect(() => {
    if (data?.status == 200 || data?.status == 201) {
      setCompareState([...compareState, productObj]);
    }
  }, [isLoading]);
  return (
    <>
      {customClass ? (
        <Btn className={customClass ?? ''} onClick={() => addToCompare(productObj)}>
          <RiRefreshLine />
        </Btn>
      ) : (
        <li title='Compare' onClick={() => addToCompare(productObj)}>
          <a>
            <RiRefreshLine />
          </a>
        </li>
      )}
    </>
  );
};

export default AddToCompare;
