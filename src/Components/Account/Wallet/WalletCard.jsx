import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Col, Row, Table } from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/Layout/Loader';
import request from '@/Utils/AxiosUtils';
import { WalletConsumerAPI } from '@/Utils/AxiosUtils/API';
import { dateFormate } from '@/Utils/CustomFunctions/DateFormate';
import walletImage from '../../../../public/assets/images/svg/wallet.svg';
import SettingContext from '@/Helper/SettingContext';
import Pagination from '@/Components/Common/Pagination';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import AccountHeading from '@/Components/Common/AccountHeading';

const WalletCard = () => {
  const [page, setPage] = useState(1);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data, isLoading, refetch } = useQuery([WalletConsumerAPI], () => request({ url: WalletConsumerAPI, params: { page, paginate: 10 } }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  const { convertCurrency } = useContext(SettingContext);
  useEffect(() => {
    refetch();
  }, [page]);
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title="MyWallet" />
      <div className='total-box mt-0'>
        <Row>
          <Col xs={12}>
            <div className='total-contain wallet-bg'>
              <Image src={walletImage} alt='walletImage' height={60} width={60} />
              <div className='total-detail'>
                <h5>{t("WalletBalance")}</h5>
                <h3>{data ? convertCurrency(data?.balance) : 0}</h3>
              </div>
            </div>
          </Col>
        </Row>
        <div className='wallet-table'>
          <h4 className='user-dashboard-title'>{t("Transactions")}</h4>
          <Table>
            <tbody>
              <tr>
                <th>{t("No.")}</th>
                <th>{t("Date")}</th>
                <th>{t("Amount")}</th>
                <th>{t("Remark")}</th>
                <th>{t("Status")}</th>
              </tr>
              {data?.transactions?.data?.map((transaction, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{dateFormate(transaction?.created_at)}</td>
                  <td>{convertCurrency(transaction.amount)}</td>
                  <td>{transaction.detail}</td>
                  <td>
                    <div className={`status-${transaction.type}`}>
                      <span>{transaction?.type}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <nav className='custome-pagination'>
          <Pagination current_page={data?.transactions?.current_page} total={data?.transactions?.total} per_page={data?.transactions?.per_page} setPage={setPage} />
        </nav>
      </div>
    </>
  );
};

export default WalletCard;
