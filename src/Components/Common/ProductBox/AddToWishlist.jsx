import { useContext } from 'react';
import Cookies from 'js-cookie';
import { RiHeartLine } from 'react-icons/ri';
import { WishlistAPI } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';
import { useRouter } from 'next/navigation';
import I18NextContext from '@/Helper/I18NextContext';
import Btn from '@/Elements/Buttons/Btn';

const AddToWishlist = ({ productObj, customClass }) => {
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const { mutate, isLoading } = useCreate(WishlistAPI, false, `/${i18Lang}/wishlist`);
  const handelWishlist = (productObj) => {
    if (Cookies.get('uat')) {
      mutate({ product_id: productObj?.id });
    } else {
      router.push(`/${i18Lang}/auth/login`);
    }
  };
  return (
    <>
      {customClass ? (
        <Btn className={customClass ? customClass : ''} onClick={() => handelWishlist(productObj)}>
          <RiHeartLine />
        </Btn>
      ) : (
        <li title='Wishlist' onClick={() => handelWishlist(productObj)}>
          <a className={'notifi-wishlist'}>
            <RiHeartLine />
          </a>
        </li>
      )}
    </>
  );
};

export default AddToWishlist;
