import Slider from 'react-slick';
import { Col, Row } from 'reactstrap';
import { detailedBannerSliderOption } from '../../../Data/SliderSettingsData';
import Image from 'next/image';

const DetailedBanner = ({ dataAPI }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className='slider-4-1 ratio_65 no-arrow product-wrapper'>
          <Slider {...detailedBannerSliderOption}>
            {dataAPI.map((elem, i) => (
              <div key={i}>
                <div className='product-slider'>
                  <a className='product-slider-image'>
                    <img src={elem?.image_url} className='w-100 rounded-3' alt={elem?.title} width={382} height={234} />
                  </a>
                  <div className='product-slider-detail'>
                    <div>
                      <a className='d-block'>
                        <h3 className='text-title'>{elem?.title}</h3>
                      </a>
                      <h5>{elem?.sub_title}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Col>
    </Row>
  );
};

export default DetailedBanner;
