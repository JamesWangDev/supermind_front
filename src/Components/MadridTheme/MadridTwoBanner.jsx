import React from 'react';
import WrapperComponent from '../Common/WrapperComponent';
import { Col, Row } from 'reactstrap';
import OfferBanner from '../ParisTheme/OfferBanner';

const MadridTwoBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'banner-section' }} noRowCol={true}>
      <Row className='g-sm-4 g-3' >
        <Col lg={6}>
          <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect' }} imgUrl={dataAPI?.two_column_banners?.banner_1?.image_url} elem={dataAPI?.two_column_banners?.banner_1} />
        </Col>
        <Col lg={6}>
          <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect' }} imgUrl={dataAPI?.two_column_banners?.banner_2?.image_url} elem={dataAPI?.two_column_banners?.banner_2} />
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default MadridTwoBanner;
