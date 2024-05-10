import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from './OfferBanner';
import I18NextContext from '@/Helper/I18NextContext';
import SkeletonWrapper from '../Common/SkeletonWrapper';
import AccountContext from '@/Helper/AccountContext';
import useCreate from '@/Utils/Hooks/useCreate';
import Cookies from 'js-cookie';
import { LogoutAPI } from '@/Utils/AxiosUtils/API';

const TopBanner = ({ dataAPI }) => {
  const router = useRouter();
  const { i18Lang } = useContext(I18NextContext);
  const account = localStorage.getItem('account');
  const userRole = JSON.parse(account)?.role;
  const { setAccountData } = useContext(AccountContext);
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

  const handleOnClickBanner = () => {
    if(userRole == 'vendor') {
      handleLogout();
      return;
    } else {
      router.push(`/${i18Lang}/seller/become-developer`);
    }
  }

  const handleGoToAdmin = () => {
    location.href = "https://supermind.bot/admin/en/auth/login";
  }

  return (
    <WrapperComponent classes={{ sectionClass: 'home-section pt-2', row: 'g-4' }} customCol={true}>
      <SkeletonWrapper classes={{ colProps: { xl: 8 }, colClass: 'ratio_65', divClass: 'home-contain h-100 skeleton-banner-xl' }}>
        <OfferBanner
          classes={{ customClass: 'home-contain h-100', customHoverClass: 'h-100 b-left' }}
          imgUrl={dataAPI?.home_banner?.main_banner?.image_url}
          ratioImage={true}
          elem={dataAPI?.home_banner?.main_banner}
        />
      </SkeletonWrapper>

      <Col xl={4} className='ratio_65'>
        <Row className='g-4'>
          <SkeletonWrapper classes={{ colProps: { xl: 12, md: 6 }, colClass: 'skeleton-banner-sm', divClass: 'home-contain' }}>
            <OfferBanner classes={{ customHoverClass: 'home-contain' }} imgUrl={dataAPI?.home_banner?.sub_banner_1?.image_url} ratioImage={true} elem={dataAPI?.home_banner?.sub_banner_1} custom redirectUrl={`/${i18Lang}/account/order` || '/'} />
          </SkeletonWrapper>

          <SkeletonWrapper classes={{ colProps: { xl: 12, md: 6 }, colClass: 'skeleton-banner-sm', divClass: 'home-contain' }}>
            <div onClick={handleOnClickBanner}>
              <OfferBanner classes={{ customHoverClass: 'home-contain' }} imgUrl={dataAPI?.home_banner?.sub_banner_2?.image_url} ratioImage={true} elem={dataAPI?.home_banner?.sub_banner_2} custom redirectUrl={'/'} />
            </div>
          </SkeletonWrapper>
        </Row>
      </Col>
    </WrapperComponent>
  );
};

export default TopBanner;
