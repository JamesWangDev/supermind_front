import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import request from '@/Utils/AxiosUtils';
import { OrderAPI, VerifyPayment } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';
import { useTranslation } from '@/app/i18n/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const PlaceOrder = ({ values }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const [getOrderNumber, setGetOrderNumber] = useState('');
  // const { isLoading: loader, refetch } = useQuery([VerifyPayment], () => request({ url: `${VerifyPayment}/${getOrderNumber}` }), { enabled: false, refetchOnWindowFocus: false });
  const { data, mutate, isLoading } = useCreate(OrderAPI, false, false, 'No', (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      resDta?.data?.order_number && setGetOrderNumber(resDta?.data?.order_number);
      // resDta?.data?.order_number && refetch();
      if (values['payment_method'] == 'cod') {
        router.push(`/account/order/details/${resDta?.data?.order_number}`);
      } else {
        window.open(resDta?.data?.url, '_self');
      }
    }
  });
  // useEffect(() => {
  //   // getOrderNumber && refetch();
  // }, [getOrderNumber]);
  const handleClick = () => {
    delete values['isPoint'];
    delete values['isTimeSlot'];
    delete values['isWallet'];
    mutate(values);
  };
  return (
    <Btn className='btn-md fw-bold mt-4 text-white theme-bg-color w-100' loading={Number(isLoading)} onClick={handleClick}>
      {t('PlaceOrder')}
    </Btn>
  );
};

export default PlaceOrder;
