import React, { useContext, useState } from 'react';
import { Input } from 'reactstrap';
import Image from 'next/image';
import useCreate from '@/Utils/Hooks/useCreate';
import { CheckoutAPI } from '@/Utils/AxiosUtils/API';
import SettingContext from '@/Helper/SettingContext';
import Btn from '@/Elements/Buttons/Btn';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/Helper/I18NextContext';

const ApplyCoupon = ({ data, setFieldValue, storeCoupon, setStoreCoupon, values }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [errorCoupon, setErrorCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const { convertCurrency } = useContext(SettingContext);
  const { mutate, isLoading } = useCreate(
    CheckoutAPI,
    false,
    false,
    'No',
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        setErrorCoupon('');
        storeCoupon !== '' && setAppliedCoupon('applied');
      } else {
        setErrorCoupon(resDta?.response?.data?.message);
      }
    },
    false,
  );
  const onCouponApply = (value) => {
    setStoreCoupon(value);
  };
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setFieldValue('coupon', '');
    setStoreCoupon('');
    mutate({ ...values });
  };
  return (
    <>
      {appliedCoupon == 'applied' ? (
        <li className='coupon-sec'>
          <div className='apply-sec mb-3'>
            <div>
              <Image src={'/assets/images/offer.gif'} className='img-fluid' height={20} width={20} alt='offer' />
              <h4>
                {t('Yousaved')} <span>{convertCurrency(data?.data?.total?.coupon_total_discount)}</span> {'withthiscode'} 🎉 <p>{t('CouponApplied')}</p>
              </h4>
            </div>
          </div>
          <a onClick={() => removeCoupon()}>{t('Remove')}</a>
        </li>
      ) : (
        <li className='coupon-sec'>
          <div className='coupon-box mt-2 mb-3 d-flex w-100'>
            <div className='input-group'>
              <Input type='text' placeholder={t('EnterCoupon')} onChange={(e) => onCouponApply(e.target.value)} />
              <Btn className='btn-apply' loading={Number(isLoading)} onClick={() => values['products']?.length > 0 && mutate({ ...values, coupon: storeCoupon })}>
                {t('Apply')}
              </Btn>
            </div>
          </div>
          <div className='invalid-feedback d-block'>{errorCoupon}</div>
        </li>
      )}
    </>
  );
};

export default ApplyCoupon;
