import Slider from 'react-slick';
import { Col, Row } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import { bestValueSliderOption } from '../../../Data/SliderSettingsData';
import CustomHeading from '../Common/CustomHeading';
import OfferBanner from '../ParisTheme/OfferBanner';

const BestValueBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent noRowCol={true}>
      <CustomHeading title={dataAPI?.title} />
      <Row>
        <Col xs={12}>
          <div className="no-arrow">
            <Slider {...bestValueSliderOption}>
              {dataAPI?.banners?.map((elem, i) => (
                <div className='three-slider arrow-slider ratio_58' key={i}>
                  <OfferBanner classes={{ customHoverClass: 'offer-banner hover-effect' }} imgUrl={elem?.image_url} ratioImage={true} elem={elem} />
                </div>
              ))}
            </Slider>
          </div>
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default BestValueBanner;
