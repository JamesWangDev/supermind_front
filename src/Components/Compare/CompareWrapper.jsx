import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import React, { useContext } from 'react';

const CompareWrapper = ({ data = {}, children }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <div className='detail-part'>
        <div className='title-detail'>
          <h5>{t(data?.title)}</h5>
        </div>
        <div className='inner-detail'>{children ? children : <p>{data?.value}</p>}</div>
      </div>
    </>
  );
};

export default CompareWrapper;
