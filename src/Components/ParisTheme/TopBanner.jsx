import { Col, Row } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from './OfferBanner';
import SkeletonWrapper from '../Common/SkeletonWrapper';

const TopBanner = ({ dataAPI }) => {
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
            <OfferBanner classes={{ customHoverClass: 'home-contain' }} imgUrl={dataAPI?.home_banner?.sub_banner_1?.image_url} ratioImage={true} elem={dataAPI?.home_banner?.sub_banner_1} />
          </SkeletonWrapper>

          <SkeletonWrapper classes={{ colProps: { xl: 12, md: 6 }, colClass: 'skeleton-banner-sm', divClass: 'home-contain' }}>
            <OfferBanner classes={{ customHoverClass: 'home-contain' }} imgUrl={dataAPI?.home_banner?.sub_banner_2?.image_url} ratioImage={true} elem={dataAPI?.home_banner?.sub_banner_2} />
          </SkeletonWrapper>
        </Row>
      </Col>
    </WrapperComponent>
  );
};

export default TopBanner;
