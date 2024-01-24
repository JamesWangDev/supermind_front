import I18NextContext from '@/Helper/I18NextContext';
import Link from 'next/link';
import { useContext } from 'react';
import { RiHeartLine } from 'react-icons/ri';

const HeaderWishList = ({ wishListIcon }) => {
  const { i18Lang } = useContext(I18NextContext);
  return (
    <li className='right-side'>
      <Link href={`/${i18Lang}/wishlist`} className='btn p-0 position-relative header-wishlist'>
        {wishListIcon ? wishListIcon : <RiHeartLine />}
      </Link>
    </li>
  );
};

export default HeaderWishList;
