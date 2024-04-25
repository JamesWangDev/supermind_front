import { useRouter } from 'next/navigation';
import AccountHeading from '@/Components/Common/AccountHeading';
import AccountContext from '@/Helper/AccountContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import Image from 'next/image';
import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import coinSvg from '../../../../public/assets/images/svg/coin.svg';
import orderSvg from '../../../../public/assets/images/svg/order.svg';
import wallerSvg from '../../../../public/assets/images/svg/wallet.svg';
import ProfileInformation from './ProfileInformation';
import Btn from '@/Elements/Buttons/Btn';

const DashboardContent = () => {
  const router = useRouter();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { accountData } = useContext(AccountContext);
  return (
    <div className='dashboard-home'>
      <AccountHeading title="MyDashboard" /> 
      <div className='dashboard-user-name'>
        <h6 className='text-title'>
          {t('Hello')}, <b className='text-title'>{accountData?.name ?? t('User')}</b>
        </h6>
        <p className='text-title'>{t("DashboardDescription")}</p>
      </div>

      <div className='total-box'>
        <Row className='g-sm-4 g-3'>
          {/* <Col xxl={4} lg={6} md={4} sm={6}>
            <div className='total-contain'>
              <Image src={wallerSvg} className='img-1' alt='wallerSvg' height={90} width={90} />
              <Image src={wallerSvg} alt='wallerSvg' height={60} width={60} />
              <div className='total-detail'>
                <h5>{t('Balance')}</h5>
                <h3>{Number(accountData?.wallet ? accountData?.wallet?.balance : 0)?.toFixed(2)}</h3>
              </div>
            </div>
          </Col> */}

          {/* <Col xxl={12} lg={12} md={12} sm={12}> */}
            <div className='total-contain'>
              <Image src={coinSvg} className='img-1 ' alt='coinSvg' height={90} width={90} />
              <Image src={coinSvg} className='' alt='coinSvg' height={60} width={60} />
              <div className='total-detail'>
                <h5>Total Points</h5>
                <h3>{Number(accountData?.point ? accountData?.point?.balance : 0)?.toFixed(2)}</h3>
              </div>
              <span className='custom-anchor ms-2' onClick={() => router.push(`/${i18Lang}/buypoints`)} style={{position: "absolute", top: 12, right: 24, fontWeight: 600, fontSize: 16}}>
                Buy Points
              </span>
            </div>
          {/* </Col> */}
          {/* 
          <Col xxl={4} lg={6} md={4} sm={6}>
            <div className='total-contain'>
              <Image src={orderSvg} className='img-1 ' alt='orderSvg' height={90} width={90} />
              <Image src={orderSvg} className='' alt='orderSvg' height={60} width={60} />
              <div className='total-detail'>
                <h5>{t("TotalOrders")}</h5>
                <h3>{0}</h3>
              </div>
            </div>
          </Col> */}
          <ProfileInformation />
        </Row>
      </div>
    </div>
  );
};

export default DashboardContent;
