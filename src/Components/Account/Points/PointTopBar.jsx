import { useContext, useEffect, useState } from 'react';
import { PointAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import Loader from '@/Layout/Loader';
import NoDataFound from '@/Components/Common/NoDataFound';
import emptyImage from '../../../../public/assets/svg/empty-items.svg';
import PointTable from './PointTable';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import AccountHeading from '@/Components/Common/AccountHeading';

const PointTopBar = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery([PointAPI], () => request({ url: PointAPI, params: { page, paginate: 10 } }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
  }, [page]);
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title="Points" />
      {data?.transactions?.data?.length > 0 ? (
        <PointTable data={data} setPage={setPage} />
      ) : (
        <NoDataFound
          data={{
            customClass: 'no-data-added',
            imageUrl: emptyImage,
            title: 'No Transaction Found',
            description: 'You have not earned any points yet',
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default PointTopBar;
