import React, { useContext, useEffect, useState } from 'react';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { RiEyeLine, RiFlashlightLine } from 'react-icons/ri';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CustomerOrderCount = ({ productState }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [customerOrder, setCustomerOrder] = useState(10);
  const [viewerCount, setViewerCount] = useState(30);
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      let encourage_max_view_count = themeOption?.product?.encourage_max_view_count ? themeOption?.product?.encourage_max_view_count : 100;
      setCustomerOrder(Math?.floor(Math.random() * encourage_max_view_count) + 1);
    }, 5000);

    timer = setInterval(() => {
      let encourage_max_order_count = themeOption?.product?.encourage_max_order_count ? themeOption?.product?.encourage_max_order_count : 100;
      setViewerCount(Math?.floor(Math.random() * encourage_max_order_count) + 1);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      {(themeOption?.product?.encourage_order && productState?.product?.encourage_order) || (themeOption?.product?.encourage_view && productState?.product?.encourage_view) ? (
        <div className='product-count'>
          <ul>
            {themeOption?.product?.encourage_order && productState?.product?.encourage_order ? (
              <li>
                <RiFlashlightLine />
                <h6 className='lang'>{customerOrder} {t("CustomersOrdered")}</h6>
              </li>
            ) : null}
            {themeOption?.product?.encourage_view && productState?.product?.encourage_view ? (
              <li>
                <RiEyeLine />
                <h6 className='lang'>{viewerCount} {t("ActiveViewInThisItem")}</h6>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default CustomerOrderCount;
