import React, { useContext } from 'react';
import { Col } from 'reactstrap';
import Link from 'next/link';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import NoDataFound from '@/Components/Common/NoDataFound';

const FooterQuickPage = ({ footerMenu, setFooterMenu }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <Col xl={2} sm={3}>
      <div className={`footer-title ${footerMenu == 'pages' ? 'show' : ''}`} onClick={() => setFooterMenu((prev) => (prev !== 'pages' ? 'pages' : ''))}>
        <h4>{t('Help Center')}</h4>
      </div>

      <div className='footer-contain'>
        <ul>
          {themeOption?.footer?.help_center?.length > 0 ? (
            themeOption?.footer?.help_center?.map((elem, i) => (
              <li key={i}>
                <Link href={`/${i18Lang}/${elem.value}`} className='text-title text-capitalize'>
                  {elem.name}
                </Link>
              </li>
            ))
          ) : (
            <NoDataFound
              data={{
                customClass: 'no-data-footer',
                title: 'No Link Found',
              }}
            />
          )}
        </ul>
      </div>
    </Col>
  );
};

export default FooterQuickPage;
