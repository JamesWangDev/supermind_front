import { Col, Row } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from '../ParisTheme/OfferBanner';

const TwoBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'banner-section' }} noRowCol={true}>
      <Row className='gy-xl-0 gy-3'>
        <Col xl={6}>
          <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect' }} imgUrl={dataAPI?.banner_1?.image_url} elem={dataAPI?.banner_1} />
        </Col>
        <Col xl={6}>
          <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect' }} imgUrl={dataAPI?.banner_2?.image_url} elem={dataAPI?.banner_2} />
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default TwoBanner;
