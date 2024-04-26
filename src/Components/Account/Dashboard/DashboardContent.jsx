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
import { user } from '@/Utils/AxiosUtils/API'

const pointsList = [
  {
    name: "500000",
    value: 500000
  },
  {
    name: "1,000,000",
    value: 1000000
  },
  {
    name: "5,000,000",
    value: 5000000
  },
  {
    name: "10,000,000",
    value: 10000000
  },
  {
    name: "50,000,000",
    value: 50000000
  },
  {
    name: "100,000,000",
    value: 100000000
  },
  {
    name: "custom",
    value: "custom"
  }
]

const DashboardContent = () => {
  const router = useRouter();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { accountData, refetch } = useContext(AccountContext);
  const { convertCurrency } = useContext(SettingContext);
  const [modal, setModal] = useState(false);
  const [devModal, setDevModal] = useState(false);
  const [point, setPoint] = useState(500000);
  const [customPoint, setCustomPoint] = useState(0);
  const account = localStorage.getItem('account');
  const userId = JSON.parse(account)?.user_id;
  const userRole = JSON.parse(account)?.role;
  const { mutate, isLoading } = useUpdate(
    user,
    userId,
    `admin/${i18Lang}/auth/login`,
    "user updated successfully"
  );

  useEffect(() => {
    refetch();
  }, [])

  const handleGoToBuy  = () => {
    const pointsvalue = point === "custom" ? customPoint : point;
    if(pointsvalue == 0) {
      alert("Please set the points amount to buy...");
      return;
    }

    if(pointsvalue < 500000) {
      alert("Points amount should be greater than 10000 points...");
      return;
    }

    router.push(`/${i18Lang}/buypoints/${pointsvalue}`);
  }

  const handleUpdateUserRole = () => {
    mutate({role_id: 3})
  }

  const handleDevModal = () => {
    if(userRole == "vendor") {
      alert("You are developer already!");
      return;
    }
    setDevModal(true);
  }

  return (
    <div className='dashboard-home'>
      <div className='d-flex align-items-center justify-content-between'>
      <AccountHeading title="MyDashboard" /> 
      <Btn title={'Become Developer'} className='btn btn-md btn-theme-primary fw-bold' onClick={handleDevModal}
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
              <span className='custom-anchor ms-2' onClick={() => setModal(true)} style={{position: "absolute", top: 12, right: 24, fontWeight: 600, fontSize: 16}}>
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
      <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal delete-modal', modalHeaderClass: 'p-2' }}>
        {/* <RiDeleteBinLine className='icon-box' /> */}
        <h5 className='modal-title'>{'Do you want to buy additional points?'}</h5>
        <p>{"Please set the points amount you want to buy for now."} </p>
        <div className='w-100 d-flex justify-content-between align-items-center p-3'>
          <div className='w-50'>
            <CustomDropDown items={pointsList} value={point} handleSelectChange={setPoint} placeholder={"Select Points amout..."} toggleStyle={{height: "40px"}} toggleClassName={"w-100 rounded-2"} />
            {point === "custom" && <Input min={10000} type='number' value={customPoint} onChange={(e) => setCustomPoint(e.target.value)} style={{height: "40px", border: "none"}} className="rounded-2 text-center mt-2" />}
          </div>
          <div className='w-50 d-flex justify-content-center' style={{fontWeight: 600, fontSize: 20}}>
            {convertCurrency(UNIT_TOKEN_PRICE * (point == "custom" ? customPoint : point) / 100)}
          </div>
        </div>
        <div className='button-box mt-4'>
          <Btn title='Cancel' className='btn btn-md btn-theme-outline fw-bold' onClick={() => {
            setModal('');
          }}
          />
          <Btn title='Confirm' className='theme-bg-color btn-md fw-bold text-light' onClick={handleGoToBuy} />
        </div>
      </CustomModal>
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
