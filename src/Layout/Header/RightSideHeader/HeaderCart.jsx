import React, { useContext, useMemo } from 'react';
import { useTranslation } from '@/app/i18n/client';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import HeaderCartData from './HeaderCartData';
import CartContext from '@/Helper/CartContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { RiShoppingCartLine } from 'react-icons/ri';

const HeaderCart = () => {
  const { themeOption, cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { cartProducts } = useContext(CartContext);
  const cartStyle = useMemo(() => {
    return themeOption?.general?.cart_style ? themeOption?.general?.cart_style : 'cart_sidebar';
  });
  return (
    <li className='right-side'>
      <div className='onhover-dropdown header-badge'>
        <Btn type='button' className='p-0 position-relative header-wishlist' onClick={() => cartStyle == 'cart_sidebar' && setCartCanvas(!cartCanvas)}>
          <RiShoppingCartLine />
          {cartProducts?.length > 0 && (
            <span className='position-absolute top-0 start-100 translate-middle badge'>
              {cartProducts?.length}
              <span className='visually-hidden'>{t('unreadmessages')}</span>
            </span>
          )}
        </Btn>
        <HeaderCartData cartStyle={cartStyle} />
      </div>
    </li>
  );
};

export default HeaderCart;
