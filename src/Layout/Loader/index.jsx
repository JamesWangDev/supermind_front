import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const Loader = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className='loader-wrapper'>
      <div>
        <div className='loader'></div>
        <h3>{t('Loading')}</h3>
      </div>
    </div>
  );
};

export default Loader;
