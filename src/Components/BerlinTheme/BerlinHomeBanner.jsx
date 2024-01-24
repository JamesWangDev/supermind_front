import { Col } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from '../ParisTheme/OfferBanner';
import SkeletonWrapper from '../Common/SkeletonWrapper';

const BerlinHomeBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section pt-0 ratio_50', row: 'g-4' }} customCol={true}>
      <SkeletonWrapper classes={{ colProps: { xl: 9, lg: 8 }, colClass: 'ratio_50_1', divClass: 'skeleton-banner-xl' }}>
        <OfferBanner classes={{ customHoverClass: 'home-contain furniture-contain-2 b-top' }} imgUrl={dataAPI?.main_banner?.image_url} ratioImage={true} elem={dataAPI?.main_banner} />
      </SkeletonWrapper>

      <Col xl={3} lg={4} className='d-lg-inline-block d-none skeleton-banner-vertical'>
        <div className='skeleton-text-wrap'>
          <span className='placeholder col-7'></span>
          <span className='placeholder col-5'></span>
          <span className='placeholder col-4'></span>
          <span className='placeholder col-6'></span>
        </div>
        <OfferBanner ratioImage classes={{ customClass: "h-100", customHoverClass: 'home-contain h-100 home-furniture b-top' }} imgUrl={dataAPI?.sub_banner_1?.image_url} elem={dataAPI?.sub_banner_1} />
      </Col>
    </WrapperComponent>
  );
};

export default BerlinHomeBanner;
