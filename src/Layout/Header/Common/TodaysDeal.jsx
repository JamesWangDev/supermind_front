import React, { useContext, useState } from 'react';
import Btn from '@/Elements/Buttons/Btn';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import HeaderDealModal from './HeaderDealModal';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { RiFlashlightLine } from 'react-icons/ri';

const TodaysDeal = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [modal, setModal] = useState(false);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <div className='header-nav-right'>
        <Btn className='btn deal-button' onClick={() => setModal(true)}>
          <RiFlashlightLine />
          <span>{t('DealToday')}</span>
        </Btn>
      </div>
      <HeaderDealModal modal={modal} setModal={setModal} data={themeOption?.header?.today_deals} />
    </>
  );
};

export default TodaysDeal;
