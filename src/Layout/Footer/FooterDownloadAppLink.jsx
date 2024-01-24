import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import I18NextContext from '@/Helper/I18NextContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useTranslation } from '@/app/i18n/client';
import appstoreImage from '../../../public/assets/images/appstore.svg';
import playstoreImage from '../../../public/assets/images/playstore.svg';

const FooterDownloadAppLink = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      {themeOption?.footer?.app_store_url || themeOption?.footer?.play_store_url ? (
        <li className='social-app mb-0'>
          <h5 className='mb-2 text-content'>{t('DownloadApp')} :</h5>
          <ul>
            {themeOption?.footer?.app_store_url && (
              <li className='mb-0'>
                <Link href={themeOption?.footer?.play_store_url} target='_blank'>
                  <Image src={playstoreImage} alt='play store' height={100} width={100} />
                </Link>
              </li>
            )}
            {themeOption?.footer?.play_store_url && (
              <li className='mb-0'>
                <Link href={themeOption?.footer?.app_store_url} target='_blank'>
                  <Image src={appstoreImage} alt='app store' height={100} width={100} />
                </Link>
              </li>
            )}
          </ul>
        </li>
      ) : (
        ''
      )}
    </>
  );
};

export default FooterDownloadAppLink;
