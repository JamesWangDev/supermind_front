import React, { useContext } from 'react';
import { FiPhone } from 'react-icons/fi';
import I18NextContext from '@/Helper/I18NextContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useTranslation } from '@/app/i18n/client';

const FooterSupportNumber = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      {themeOption?.footer?.support_number && (
        <li>
          <div className='footer-number'>
            <FiPhone />
            <div className='contact-number'>
              <h6 className='text-content'>{t("Hotline")}  24/7 :</h6>
              <h5>{themeOption?.footer?.support_number}</h5>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default FooterSupportNumber;
