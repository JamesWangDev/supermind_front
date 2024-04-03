import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';
import { RiMailLine, RiSmartphoneLine } from 'react-icons/ri';

const StoreVendor = ({ elem }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      {(Boolean(elem?.hide_vendor_email) || Boolean(elem?.hide_vendor_phone)) && (
        <div className='seller-contact-details'>
          {Boolean(elem?.hide_vendor_email) && (
            <div className='saller-contact'>
              <div className='seller-icon'>
                <RiSmartphoneLine />
              </div>

              <div className='contact-detail'>
                <h5>
                  {t('ContactUS')} : <span> {elem?.vendor?.phone}</span>
                </h5>
              </div>
            </div>
          )}

          {Boolean(elem?.hide_vendor_phone) && (
            <div className='saller-contact'>
              <div className='seller-icon'>
                <RiMailLine />
              </div>
              <div className='contact-detail'>
                <h5>
                  {t('Email')}: <span> {elem?.vendor?.email}</span>
                </h5>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StoreVendor;
