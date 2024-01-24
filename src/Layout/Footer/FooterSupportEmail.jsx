import React, { useContext } from 'react';
import { FiMail } from 'react-icons/fi';
import I18NextContext from '@/Helper/I18NextContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useTranslation } from '@/app/i18n/client';

const FooterSupportEmail = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      {themeOption?.footer?.support_email && (
        <li>
          <div className='footer-number'>
            <FiMail />
            <div className='contact-number'>
              <h6 className='text-content'>{t("EmailAddress")} :</h6>
              <h5>{themeOption?.footer?.support_email}</h5>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default FooterSupportEmail;
