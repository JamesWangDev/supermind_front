import Link from 'next/link';
import { placeHolderImage } from '../../../Data/CommonPath';
import HandleQuantity from './HandleQuantity';
import Avatar from '../Common/Avatar';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SettingContext from '@/Helper/SettingContext';

const CartProductDetail = ({ elem }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  return (
    <td className='product-detail'>
      <div className='product border-0'>
        <Link href={`/${i18Lang}/product/${elem?.product?.slug}`} className='product-image'>
          <Avatar customImageClass={'img-fluid'} data={elem?.variation?.variation_image ?? elem?.product?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.product?.name} />
        </Link>
        <div className='product-detail'>
          <ul>
            <li className='name'>
              <Link href={`/${i18Lang}/product/${elem?.product?.slug}`}>{elem?.variation?.name ?? elem?.product?.name}</Link>
            </li>

            <li className='text-title'>
              <span className='text-title'>{t('SoldBy')} : </span> {t('Fastkart')}
            </li>

            <li className='text-title'>
              <span className='text-title'>{t('Unit')}</span> : {elem?.variation?.unit ?? elem?.product?.unit}
            </li>

            <li>
              <h5 className='text-title d-inline-block'>{t('Price')} :</h5>
              <span>{convertCurrency(elem?.product?.sale_price)}</span>
              <span className='text-title'>{convertCurrency(elem?.variation?.price) ?? convertCurrency(elem?.product?.price)}</span>
            </li>

            <li>
              <h5 className='saving theme-color'>
                {t('Saving')} : {convertCurrency(Number((elem?.variation?.price ?? elem?.product?.price) - (elem?.variation?.sale_price ?? elem?.product?.sale_price)))}
                {/* {t('Saving')} : {Number((elem?.variation?.price ?? elem?.product?.price) - (elem?.variation?.sale_price ?? elem?.product?.sale_price))} */}
              </h5>
            </li>

            <HandleQuantity productObj={elem?.product} elem={elem} classes={{ customClass: 'quantity-price-box' }} />

            <li>
              <h5>
                {t('Total')}: ${elem?.sub_total}
              </h5>
            </li>
          </ul>
        </div>
      </div>
    </td>
  );
};

export default CartProductDetail;
