import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Col } from 'reactstrap';
import Slider from 'react-slick';
import { placeHolderImage } from '../../../../../../Data/CommonPath';
import { viewModalSliderOption } from '../../../../../../Data/SliderSettingsData';

const LeftSideModal = ({ cloneVariation, productObj }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  const { nav1, nav2 } = state;
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);
  return (
    <Col lg='6'>
      <div className='view-image-slider'>
        <Slider asNavFor={nav2} ref={(slider) => (slider1.current = slider)}>
          {cloneVariation?.product?.product_galleries?.map((item, i) => (
            <div className='slider-image' key={i}>
              <Image src={item ? item?.original_url : placeHolderImage} className='img-fluid' alt={cloneVariation?.product?.name} width={500} height={500} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="thumbnail-slider">
        <Slider {...viewModalSliderOption} slidesToShow={cloneVariation?.product?.product_galleries?.length - 1} asNavFor={nav1} ref={(slider) => (slider2.current = slider)}>
          {cloneVariation?.product?.product_galleries?.map((item, i) => (
            <div className='slider-image' key={i}>
              <div className="thumbnail-image">
                <Image src={item ? item?.original_url : placeHolderImage} className='img-fluid' alt={cloneVariation?.product?.name} width={500} height={500} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/*>
       
       */}
    </Col>
  );
};

export default LeftSideModal;
