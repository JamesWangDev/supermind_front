import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import React, { useContext } from 'react';

const AuthHeadings = (props) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { heading1, heading2 } = props;
  return (
    <div className='log-in-title'>
      <h3>{t(heading1)}</h3>
      <h4>{t(heading2)}</h4>
    </div>
  );
};

export default AuthHeadings;
