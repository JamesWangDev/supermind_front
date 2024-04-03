import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Col, Row } from 'reactstrap';
import { productDetailSlider } from '../../../../Data/SliderSettingsData';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const ProductThumbnailSlider = ({ productState }) => {
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
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Col xl={6}>
      <div className='product-left-box'>
        <Row className='g-2'>
          <Col xs={12}>
            <div className='product-main-1'>
              {productState?.product?.is_sale_enable ? (
                <div className='product-label-tag'>
                  <span>{t('SALE')}</span>
                </div>
              ) : productState?.product?.is_featured ? (
                <div className='product-label-tag warning-label-tag'>
                  <span>{t('Featured')}</span>
                </div>
              ) : null}
              <Slider asNavFor={nav2} ref={(slider) => (slider1.current = slider)}>
                {productState?.product?.product_galleries?.map((elem, i) => (
                  <div key={i}>
                    <div className='slider-image'>
                      <img height={580} width={580} src={elem?.original_url} className='img-fluid' alt={elem?.name} />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Col>

          {/* <Col xs={12}>
            <div className='bottom-slider-image left-slider slick-top no-arrow'>
              <Slider
                {...productDetailSlider(productState?.product?.product_galleries?.length < 3 ? productState?.product?.product_galleries?.length : 3)}
                slidesToShow={productState?.product?.product_galleries?.length < 3 ? productState?.product?.product_galleries?.length : 3}
                asNavFor={nav1}
                ref={(slider) => (slider2.current = slider)}>
                {productState?.product?.product_galleries?.map((elem, i) => (
                  <div key={i}>
                    <div className='sidebar-image'>
                      <img height={130} width={130} src={elem?.original_url} className='img-fluid' alt={elem?.name} />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Col> */}
        </Row>
      </div>
    </Col>
  );
};

export default ProductThumbnailSlider;
