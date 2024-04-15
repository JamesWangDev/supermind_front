import React, { useContext } from 'react';
import { CardBody } from 'reactstrap';
import SettingContext from '../../../Helper/SettingContext';
import Image from 'next/image';
import CartContext from '@/Helper/CartContext';
import { placeHolderImage } from '../../../../Data/CommonPath';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/Helper/I18NextContext';

const SidebarProduct = ({ values }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { cartProducts } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  return (
    <CardBody>
      <div className='title-header'>
        <h5 className='fw-bold'>{t('Checkout')}</h5>
      </div>
      <div className='product-details'>
        <>
          <ul className='cart-listing'>
            {cartProducts?.map((item, i) => (
              <li key={i}>
                <Image
                  src={
                    item?.variation && item?.variation?.variation_image
                      ? item?.variation?.variation_image?.original_url
                      : item?.product?.product_thumbnail
                      ? item?.product?.product_thumbnail?.original_url
                      : placeHolderImage
                  }
                  className='img-fluid'
                  alt={item?.product?.name || 'product'}
                  width={70}
                  height={70}
                />
                <div className='cart-content'>
                  <h4>{item?.variation ? item?.variation?.name : item?.product?.name}</h4>
                  <h5 className='text-theme'>
                    {item?.variation ? convertCurrency(item?.variation.sale_price) : convertCurrency(item?.product?.sale_price)} x {item.quantity}
                  </h5>
                  <h5 className='price'>{convertCurrency((item?.variation ? item?.variation.sale_price : item?.product?.sale_price) * item.quantity)}</h5>
                </div>
              </li>
            ))}
          </ul>
        </>
      </div>
    </CardBody>
  );
};

export default SidebarProduct;
