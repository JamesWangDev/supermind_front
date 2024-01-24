import I18NextContext from '@/Helper/I18NextContext';
import { useCountdown } from '@/Utils/Hooks/useCountDown';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';

const OfferTimer = ({ productState }) => {
  const [days, hours, minutes, seconds] = useCountdown(productState?.product?.sale_starts_at, productState?.product?.sale_expired_at);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  if (days + hours + minutes + seconds <= 0) {
    return null;
  } else {
    return (
      <div className='time deal-timer product-deal-timer mx-md-0 mx-auto' id='clockdiv-1'>
        <div className='product-title'>
          <h4>{t("HurryUpSalesEndsIn")}</h4>
        </div>
        <ul>
          <li>
            <div className='counter d-block'>
              <div className='days d-block'>
                <h5>{days}</h5>
              </div>
              <h6>{t("Days")}</h6>
            </div>
          </li>
          <li>
            <div className='counter d-block'>
              <div className='hours d-block'>
                <h5>{hours}</h5>
              </div>
              <h6>{t("Hours")}</h6>
            </div>
          </li>
          <li>
            <div className='counter d-block'>
              <div className='minutes d-block'>
                <h5>{minutes}</h5>
              </div>
              <h6>{t("Min")}</h6>
            </div>
          </li>
          <li>
            <div className='counter d-block'>
              <div className='seconds d-block'>
                <h5>{seconds}</h5>
              </div>
              <h6>{t("Sec")}</h6>
            </div>
          </li>
        </ul>
      </div>
    );
  }
};

export default OfferTimer;
