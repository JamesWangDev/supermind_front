import WrapperComponent from '../Common/WrapperComponent';
import { Col, Row } from 'reactstrap';
import OfferBanner from '../ParisTheme/OfferBanner';

const DeliveryBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'banner-section' }} noRowCol={true}>
      <Row className='g-sm-4 g-3'>
        <Col lg={8}>
          <OfferBanner classes={{ customHoverClass: 'banner-contain h-100 hover-effect' }} imgUrl={dataAPI?.banner_1?.image_url} elem={dataAPI?.banner_1} />
        </Col>
        <Col lg={4}>
          <OfferBanner classes={{ customHoverClass: 'banner-contain h-100 hover-effect' }} imgUrl={dataAPI?.banner_2?.image_url} elem={dataAPI?.banner_2} />
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default DeliveryBanner;
