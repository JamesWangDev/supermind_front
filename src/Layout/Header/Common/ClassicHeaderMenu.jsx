import React, { useContext } from 'react';
import Btn from '@/Elements/Buttons/Btn';
import MainHeaderMenu from './MainHeaderMenu';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { RiCloseLine } from 'react-icons/ri';

const ClassicHeaderMenu = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className='header-nav-middle'>
      <div className='main-nav navbar navbar-expand-xl navbar-light navbar-sticky'>
        <div className={`offcanvas offcanvas-collapse order-xl-2 ${mobileSideBar ? 'show' : ''}`} id='primaryMenu'>
          <div className='offcanvas-header navbar-shadow'>
            <h5>{t('Menu')}</h5>
            <Btn className='btn-close lead' type='button' onClick={() => setMobileSideBar(!mobileSideBar)}>
              <RiCloseLine/>
            </Btn>
          </div>
          <div className='offcanvas-body'>
            <MainHeaderMenu />
          </div>
        </div>
        {mobileSideBar && <div className={'offcanvas-backdrop fade show'} onClick={() => setMobileSideBar(!mobileSideBar)} />}
      </div>
    </div>
  );
};

export default ClassicHeaderMenu;
