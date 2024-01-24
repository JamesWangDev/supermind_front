import React, { useContext, useEffect, useState } from 'react';
import { Card, Col } from 'reactstrap';
import SettingContext from '../../../Helper/SettingContext';
import { useTranslation } from '@/app/i18n/client';
import SidebarProduct from './SidebarProduct';
import useCreate from '@/Utils/Hooks/useCreate';
import { CheckoutAPI } from '@/Utils/AxiosUtils/API';
import CartContext from '@/Helper/CartContext';
import Loader from '@/Layout/Loader';
import PointWallet from './PointWallet';
import I18NextContext from '@/Helper/I18NextContext';
import ApplyCoupon from './ApplyCoupon';
import PlaceOrder from './PlaceOrder';

const CheckoutSidebar = ({ values, setFieldValue }) => {
  const [storeCoupon, setStoreCoupon] = useState();
  const { convertCurrency } = useContext(SettingContext);
  const { cartProducts } = useContext(CartContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data, mutate, isLoading } = useCreate(CheckoutAPI, false, false, true, false, false);
  // Submitting data on Checkout
  useEffect(() => {
    if (values['billing_address_id'] && values['shipping_address_id'] && values['delivery_description'] && values['payment_method']) {
      values['variation_id'] = '';
      delete values['total'];
      values['products'] = cartProducts;
      values['return_url'] = `${process.env.PAYMENT_RETURN_URL}/${i18Lang}/account/order/details`;
      values['cancel_url'] = process.env.PAYMENT_CANCEL_URL;
      values['products']?.length > 0 && mutate(values);
      if (isLoading) {
        setStoreCoupon('');
      }
    }
  }, [values['billing_address_id'], values['shipping_address_id'], values['payment_method'], values['delivery_description'], values['points_amount'], values['wallet_balance']]);

  return (
    <Col xxl='4' xl='5'>
      <Card className='pos-detail-card'>
        <SidebarProduct values={values} setFieldValue={setFieldValue} />
        <div className='pos-loader'>
          <ul className={`summary-total position-relative`}>
            {isLoading && <Loader />}
            <li>
              <h4>{t('Subtotal')}</h4>
              <h4 className='price'>{data?.data?.total?.sub_total ? convertCurrency(data?.data?.total?.sub_total) : t(`Notcalculatedyet`)}</h4>
            </li>
            <li>
              <h4>{t('Shipping')}</h4>
              <h4 className='price'>{data?.data?.total?.shipping_total >= 0 ? convertCurrency(data?.data?.total?.shipping_total) : t(`Notcalculatedyet`)}</h4>
            </li>
            <li>
              <h4>{t('Tax')}</h4>
              <h4 className='price'>{data?.data?.total?.tax_total ? convertCurrency(data?.data?.total?.tax_total) : t(`Notcalculatedyet`)}</h4>
            </li>

            <PointWallet values={values} setFieldValue={setFieldValue} data={data} />

            <ApplyCoupon values={values} setFieldValue={setFieldValue} data={data} storeCoupon={storeCoupon} setStoreCoupon={setStoreCoupon} />

            <li className='list-total'>
              <h4>{t('Total')}</h4>
              <h4 className='price'>{data?.data?.total?.total ? convertCurrency(data?.data?.total?.total) : t(`Notcalculatedyet`)}</h4>
            </li>
          </ul>
        </div>
        <PlaceOrder values={values} />
      </Card>
    </Col>
  );
};

export default CheckoutSidebar;
