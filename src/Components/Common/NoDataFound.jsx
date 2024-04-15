import { useContext } from 'react';
import Image from 'next/image';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const NoDataFound = ({ data = {} }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className={data?.customClass ? data?.customClass : ''}>
      {data?.imageUrl && <Image src={data?.imageUrl} className='img-fluid' alt='no-data' height={data?.height} width={data?.width} />}
      <h4>{t(data?.title)}</h4>
      <p>{t(data?.description)}</p>
    </div>
  );
};

export default NoDataFound;
