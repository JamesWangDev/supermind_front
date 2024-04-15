import { useContext } from 'react';
import Image from 'next/image';
import { Col, Row, Table } from 'reactstrap';
import { RiInformationLine } from 'react-icons/ri';
import Pagination from '@/Components/Common/Pagination';
import { dateFormate } from '@/Utils/CustomFunctions/DateFormate';
import CoinSVG from '../../../../public/assets/images/svg/coin.svg';
import SettingContext from '@/Helper/SettingContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const PointTable = ({ data, setPage }) => {
  const { settingData } = useContext(SettingContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <div className='total-box mt-0'>
        <Row>
          <Col xs={12}>
            <div className='total-contain wallet-bg'>
              <Image src={CoinSVG} alt='CoinSVG' height={60} width={60} />
              <div className='total-detail'>
                <h5>{t("TotalPoints")}</h5>
                <h3>{data?.balance ? data?.balance : 0}</h3>
              </div>
              <div className='point-ratio'>
                <h3 className='counter'>
                  <RiInformationLine /> 1 {t("Point")} = {(1 / settingData?.wallet_points?.point_currency_ratio).toFixed(2)} Balance
                </h3>
              </div>
            </div>
          </Col>
        </Row>
        <div className='wallet-table'>
          <h4 className='user-dashboard-title'>{t("Transactions")}</h4>
          <div className="table-responsive">
            <Table>
              <tbody>
                <tr>
                  <th>{t("No.")}</th>
                  <th>{t("Date")}</th>
                  <th>{t("Amount")}</th>
                  <th>{t("Remark")}</th>
                  <th>{t("Status")}</th>
                </tr>
                {data?.transactions?.data.map((transaction, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{dateFormate(transaction?.created_at)}</td>
                    <td>{transaction?.amount} </td>
                    <td>{transaction?.detail}</td>
                    <td>
                      <div className={`status-${transaction?.type}`}>
                        <span>{transaction?.type}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <nav className='custome-pagination'>
        <Pagination current_page={data?.transactions?.current_page} total={data?.transactions?.total} per_page={data?.transactions?.per_page} setPage={setPage} />
      </nav>
    </>
  );
};

export default PointTable;
