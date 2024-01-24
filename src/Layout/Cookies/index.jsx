import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import CookiesImage from '../../../public/assets/images/cookie-bar.png';

const CookiesComponent = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [checkCookies, setCheckCookies] = useState(true);
  useEffect(() => {
    const cookieAccept = Cookies.get('CookieAccept');
    if (cookieAccept) {
      setCheckCookies(JSON.parse(cookieAccept));
    } else {
      setCheckCookies(false);
    }
  }, []);
  const handleCookie = () => {
    Cookies.set('CookieAccept', JSON.stringify(true));
    setCheckCookies(true);
  };
  return (
    <div className={`cookie-bar-box ${checkCookies ? 'd-none' : ''}`}>
      <div className='cookie-box'>
        <div className='cookie-image'>
          <Image height={22} width={22} src={CookiesImage} alt='cookie' />
          <h2>{t('cookies')} </h2>
        </div>
        <div className='cookie-contain'>
          <h5 className='text-content'>{t('WeUseCookiesToMakeYourExperienceBetter')}</h5>
        </div>
      </div>
      <div className='button-group'>
        <Btn className='privacy-button' title='privacyPolicy' />
        <Btn className='ok-button' title='ok' onClick={handleCookie} />
      </div>
    </div>
  );
};

export default CookiesComponent;
