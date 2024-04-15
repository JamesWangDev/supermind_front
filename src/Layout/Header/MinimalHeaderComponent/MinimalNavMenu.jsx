import React, { useContext } from 'react';
import MinimalRightSidebar from './MinimalRightSidebar';
import MainHeaderMenu from '../Common/MainHeaderMenu';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { RiCloseLine } from 'react-icons/ri';

const MinimalNavMenu = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);

  return (
    <div className='main-nav nav-left-align'>
      <div className='main-nav navbar navbar-expand-xl navbar-light navbar-sticky p-0'>
        <div className={`offcanvas offcanvas-collapse order-xl-2 ${mobileSideBar ? 'show' : ''}`} id='primaryMenu'>
          <div className='offcanvas-header navbar-shadow'>
            <h5>{t('Menu')}</h5>
            <Btn className='btn-close lead' type='button' onClick={() => setMobileSideBar(!mobileSideBar)}><RiCloseLine /></Btn>
          </div>
          <div className='offcanvas-body'>
            <MainHeaderMenu />
          </div>
        </div>
        {mobileSideBar && <div className={"offcanvas-backdrop fade show"} onClick={() => setMobileSideBar(!mobileSideBar)} />}
      </div >
      <MinimalRightSidebar />
    </div >
  );
};

export default MinimalNavMenu;
