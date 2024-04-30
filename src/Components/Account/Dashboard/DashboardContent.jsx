import { useRouter } from 'next/navigation';
import AccountHeading from '@/Components/Common/AccountHeading';
import AccountContext from '@/Helper/AccountContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import coinSvg from '../../../../public/assets/images/svg/coin.svg';
import orderSvg from '../../../../public/assets/images/svg/order.svg';
import wallerSvg from '../../../../public/assets/images/svg/wallet.svg';
import ProfileInformation from './ProfileInformation';
import Btn from '@/Elements/Buttons/Btn';
import CustomModal from '@/Components/Common/CustomModal';
import CustomDropDown from '@/Components/Common/CustomDropDown/CustomDropDown';
import {Input} from 'reactstrap';
import { UNIT_TOKEN_PRICE } from '@/Utils/TokenUtil/calculateTokenPrice';
import SettingContext from '@/Helper/SettingContext';
import useUpdate from '@/Utils/Hooks/useUpdate';
import { user, LogoutAPI } from '@/Utils/AxiosUtils/API'
import useCreate from '@/Utils/Hooks/useCreate';
import Cookies from 'js-cookie';
import BuyPointsModal from '@/Components/BuyPointsModal';

const DashboardContent = () => {
  const router = useRouter();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { accountData, refetch, setAccountData } = useContext(AccountContext);
  const [modal, setModal] = useState(false);
  const [devModal, setDevModal] = useState(false);
  const account = localStorage.getItem('account');
  const userId = JSON.parse(account)?.user_id;
  const userRole = JSON.parse(account)?.role;
  const { mutate, isLoading } = useUpdate(
    user,
    userId,
    false,
    "user updated successfully",
    () => {
      handleLogout()
    }
  );

  const { mutate: logOut, isLoading: isLogoutloading } = useCreate(LogoutAPI, false, false, false, () => {
    Cookies.remove('uat');
    Cookies.remove('ue');
    Cookies.remove('account');
    Cookies.remove('CookieAccept');
    localStorage.removeItem('account');
    localStorage.removeItem('role');
    setAccountData(null);
    handleGoToAdmin();
  });

  const handleLogout = () => {
    logOut({});
  };

  const handleGoToAdmin = () => {
    location.href = "https://supermind.bot/admin/en/auth/login";
  }

  useEffect(() => {
    refetch();
  }, [])

  const handleUpdateUserRole = () => {
    mutate({role_id: 3})
  }

  const handleDevModal = () => {
    if(userRole == "vendor") {
      handleLogout();
      return;
    }
    setDevModal(true);
  }

  return (
    <div className='dashboard-home'>
      <div className='d-flex align-items-center justify-content-between'>
      <AccountHeading title="MyDashboard" /> 
      <Btn title={userRole == "vendor" ? "Go to developer dashboard" : 'Become Developer'} className='btn btn-md btn-theme-primary fw-bold' onClick={handleDevModal}
      />
      </div>
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
              {/* <span className='custom-anchor ms-2' onClick={() => router.push(`/${i18Lang}/buypoints`)} style={{position: "absolute", top: 12, right: 24, fontWeight: 600, fontSize: 16}}>
                Buy Points
              </span> */}
              <div style={{position: "absolute", top: 12, right: 24, fontWeight: 600, fontSize: 16}}>
                <span className='custom-anchor ms-2' onClick={() => {router.push(`/${i18Lang}/subscribe/`)}}>
                  Subscribe
                </span>
                <span className='custom-anchor mx-2'>|</span>
                <span className='custom-anchor' onClick={() => setModal(true)}>
                  Buy Points
                </span>
              </div>
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
      <BuyPointsModal modal={modal} setModal={setModal} />
      <CustomModal modal={devModal} setModal={setDevModal} classes={{ modalClass: 'theme-modal delete-modal', modalHeaderClass: 'p-3' }}>
        <h5 className='modal-title mt-4'>{'Do you want to become developer of superminds?'}</h5>
        <div className='button-box mt-4'>
          <Btn title='Cancel' className='btn btn-md btn-theme-outline fw-bold' onClick={() => {
            setModal('');
          }}
          />
          <Btn title='Ok' className='theme-bg-color btn-md fw-bold text-light' onClick={handleUpdateUserRole} />
        </div>
      </CustomModal>
    </div>
  );
};

export default DashboardContent;
