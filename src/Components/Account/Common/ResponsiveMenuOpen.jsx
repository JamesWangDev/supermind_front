import Btn from '@/Elements/Buttons/Btn';
import AccountContext from '@/Helper/AccountContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';

const ResponsiveMenuOpen = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { mobileSideBar, setMobileSideBar } = useContext(AccountContext);
  
  const { t } = useTranslation(i18Lang, 'common');
  return <Btn className='btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none' onClick={()=>setMobileSideBar(!mobileSideBar)}>{t('ShowMenu')}</Btn>;
};

export default ResponsiveMenuOpen;
