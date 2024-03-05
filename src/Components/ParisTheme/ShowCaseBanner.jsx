import { Col, Row } from 'reactstrap';
import OfferBanner from './OfferBanner';

const ShowCaseBanner = ({ dataAPI }) => {
  return (
    <div className='mt-3'>
      <Row className='g-md-3 g-3 ratio_30'>
        <Col md={6}>
          <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect b-left' }} imgUrl={dataAPI?.banner_1?.image_url} ratioImage={true} elem={dataAPI?.banner_1} />
        </Col>
        <Col md={6}>
          <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect b-left' }} imgUrl={dataAPI?.banner_2?.image_url} ratioImage={true} elem={dataAPI?.banner_2} />
        </Col>
      </Row>
    </div>
  );
};

export default ShowCaseBanner;
