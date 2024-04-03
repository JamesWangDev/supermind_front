import { Fragment, useContext, useMemo } from 'react';
import Link from 'next/link';
import { optionList } from '../../../../Data/CustomData';
import CartContext from '@/Helper/CartContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import HeaderCartData from './HeaderCartData';
import I18NextContext from '@/Helper/I18NextContext';

const StandardRightSide = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { cartProducts } = useContext(CartContext);
  const { themeOption, cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const cartStyle = useMemo(() => {
    return themeOption?.general?.cart_style ? themeOption?.general?.cart_style : 'cart_sidebar';
  });
  return (
    <div className='rightside-menu'>
      <div className='option-list'>
        <ul>
          {optionList.map((elem) => (
            <Fragment key={elem.id}>
              <li className='onhover-dropdown' onClick={() => elem?.isBadge && cartStyle == 'cart_sidebar' && setCartCanvas(!cartCanvas)}>
                {elem?.path ? (
                  <Link href={`/${i18Lang}${elem?.path}`} className={`header-icon ${elem.customClass ? elem.customClass : ''}`}>
                    {elem.icon}
                  </Link>
                ) : (
                  <a className={`header-icon ${elem.customClass ? elem.customClass : ''}`}>
                    {elem?.isBadge && cartProducts?.length > 0 && <small className='badge-number'>{cartProducts?.length}</small>}
                    {elem.icon}
                  </a>
                )}
                {elem.isBadge && <HeaderCartData cartStyle={cartStyle} />}
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StandardRightSide;
