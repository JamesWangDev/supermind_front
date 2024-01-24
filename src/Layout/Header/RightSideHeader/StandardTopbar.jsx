import React, { useContext } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import TopbarSlider from '../Common/TopbarSlider';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const StandardTopbar = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className='header-notification theme-bg-color overflow-hidden py-2'>
      <TopbarSlider customClassName='text-center' />
      <Btn className='btn close-notification'>
        <span>{t('Close')}</span> <RiTimeLine />
      </Btn>
    </div>
  );
};

export default StandardTopbar;
