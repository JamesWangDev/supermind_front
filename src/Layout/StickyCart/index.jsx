import { useContext, useEffect, useState } from 'react';
import Btn from '@/Elements/Buttons/Btn';
import { RiCloseLine, RiShoppingBasketLine } from 'react-icons/ri';
import CartContext from '@/Helper/CartContext';
import Avatar from '@/Components/Common/Avatar';
import { placeHolderImage } from '../../../Data/CommonPath';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/Helper/I18NextContext';
import Link from 'next/link';
import SettingContext from '@/Helper/SettingContext';

const StickyCart = () => {
  const { cartProducts, getTotal } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [openCart, setOpenCart] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenCart(false);
    }, 1000);
    return () => {
      setOpenCart((prev) => !prev);
      clearTimeout(timer);
    };
  }, [cartProducts]);
  return (
    <>
      <div className='button-item'>
        <Btn className='item-btn text-white' onClick={() => setOpenCart((prev) => !prev)}>
          <RiShoppingBasketLine />
        </Btn>
      </div>
      <div className={`item-section ${openCart ? 'active' : ''}`}>
        <Btn className='close-button' onClick={() => setOpenCart((prev) => !prev)}>
          <RiCloseLine />
        </Btn>
        <h6>
          <RiShoppingBasketLine />
          <span>
            {cartProducts?.length} {t('Items')}
          </span>
        </h6>
        <ul className='items-image'>
          {cartProducts?.slice(0, 2)?.map((elem, i) => (
            <li key={i}>
              <Avatar data={elem?.product?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.product?.name} height={20} width={20} />
            </li>
          ))}
          {cartProducts?.length > 2 && <li>+{Number(cartProducts?.length - 2)}</li>}
        </ul>
        <Link href={`/${i18Lang}/cart`} className='btn item-button btn-sm fw-bold'>
          {convertCurrency(getTotal(cartProducts))}
        </Link>
      </div>
    </>
  );
};

export default StickyCart;
