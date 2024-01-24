import NoDataFound from '@/Components/Common/NoDataFound';
import Pagination from '@/Components/Common/Pagination';
import Loader from '@/Layout/Loader';
import request from '@/Utils/AxiosUtils';
import { RefundAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import emptyImage from '../../../../public/assets/svg/empty-items.svg';
import { Table } from 'reactstrap';
import { dateFormate } from '@/Utils/CustomFunctions/DateFormate';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import AccountHeading from '@/Components/Common/AccountHeading';

const RefundTable = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery([RefundAPI], () => request({ url: RefundAPI, params: { page, paginate: 10 } }), {
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
      <AccountHeading title="Refund" />
      {data?.data?.length > 0 ? (
        <>
          <div className='total-box mt-0'>
            <div className='wallet-table mt-0'>
              <Table>
                <tbody>
                  <tr>
                    <th>{t("No")}</th>
                    <th>{t("Order")}</th>
                    <th>{t("Status")}</th>
                    <th>{t("Reason")}</th>
                    <th>{t("CreatedAt")}</th>
                  </tr>
                  {data?.data?.map((refund, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <span className='fw-bolder'>#{refund?.order?.order_number}</span>
                      </td>
                      <td>
                        <div className={`status-${refund.status}`}>
                          <span>{refund.status}</span>
                        </div>
                      </td>
                      <td>{refund?.reason}</td>
                      <td>{dateFormate(refund?.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <nav className='custome-pagination'>
            <Pagination current_page={data?.transactions?.current_page} total={data?.transactions?.total} per_page={data?.transactions?.per_page} setPage={setPage} />
          </nav>
        </>
      ) : (
        <NoDataFound
          data={{
            customClass: 'no-data-added',
            imageUrl: emptyImage,
            title: 'NoRefundsFound',
            description: 'YouHaveNoRefundsProcessedYet',
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default RefundTable;
