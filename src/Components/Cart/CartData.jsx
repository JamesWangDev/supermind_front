import { useContext } from 'react';
import HandleQuantity from './HandleQuantity';
import CartContext from '@/Helper/CartContext';
import CartProductDetail from './CartProductDetail';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SettingContext from '@/Helper/SettingContext';

const CartData = ({ elem }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { removeCart } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  return (
    <tr className='product-box-contain'>
      <CartProductDetail elem={elem} />

      <td className='price'>
        <h4 className='table-title text-title'>{t('Price')}</h4>
        <h5 className='text-title'>
          {convertCurrency(elem?.product?.sale_price)} <del className='text-content'>{convertCurrency(elem?.product?.price)}</del>
        </h5>
      </td>

      <td className='quantity'>
        <h4 className='table-title text-title'>{t('Qty')}</h4>
        <HandleQuantity productObj={elem?.product} classes={{ customClass: 'quantity-price' }} elem={elem} />
      </td>

      <td className='subtotal'>
        <h4 className='table-title text-title'>{t('Total')}</h4>
        <h5 className='text-title'>{convertCurrency(elem?.sub_total)}</h5>
      </td>

      <td className='save-remove'>
        <h4 className='table-title text-title'>{t('Action')}</h4>
        <a className='save notifi-wishlist'>{t('Saveforlater')}</a>
        <a className='remove close_button' onClick={() => removeCart(elem.product_id, elem?.id)}>
          {t('Remove')}
        </a>
      </td>
    </tr>
  );
};

export default CartData;
