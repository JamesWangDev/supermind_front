import { Col, Row } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import SmallBanner from './SmallBanner';
import OfferBanner from '../ParisTheme/OfferBanner';
import SkeletonWrapper from '../Common/SkeletonWrapper';

const RomeHomeBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section-2 home-section-small section-b-space' }} noRowCol={true} style={{ backgroundImage: `url(${dataAPI?.home_banner?.bg_image_url})` }}>
      <Row className='g-4'>
        <SkeletonWrapper classes={{ colProps: { xxl: 6, md: 8 }, colClass: 'ratio_65', divClass: 'home-contain h-100 skeleton-banner-xl' }}>
          <OfferBanner classes={{ customHoverClass: 'home-contain h-100' }} imgUrl={dataAPI?.home_banner?.main_banner?.image_url} elem={dataAPI?.home_banner?.main_banner} ratioImage={true} />
        </SkeletonWrapper>

        <SkeletonWrapper classes={{ colProps: { xxl: 3, md: 4 }, colClass: 'ratio_medium d-md-block d-none', divClass: 'home-contain home-small h-100 skeleton-banner-vertical' }}>
          <OfferBanner
            classes={{ customClass: 'home-contain home-small h-100', customHoverClass: 'h-100' }}
            imgUrl={dataAPI?.home_banner?.sub_banner_1?.image_url}
            ratioImage={true}
            elem={dataAPI?.home_banner?.sub_banner_1}
          />
        </SkeletonWrapper>

        <Col xxl={3} className='ratio_65 d-xxl-block d-none'>
          <Row className='g-3'>
            <SmallBanner dataAPI={dataAPI?.home_banner?.sub_banner_2} />
            <SmallBanner dataAPI={dataAPI?.home_banner?.sub_banner_3} />
          </Row>
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default RomeHomeBanner;
