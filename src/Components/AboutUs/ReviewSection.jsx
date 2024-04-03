import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import Image from 'next/image';
import { useContext } from 'react';
import { RiDoubleQuotesR } from 'react-icons/ri';
import Slider from 'react-slick';
import { Col, Container, Row } from 'reactstrap';
import { reviewSectionSlider } from '../../../Data/SliderSettingsData';

const ReviewSection = () => {
  const { themeOption } = useContext(ThemeOptionContext);

  return (
    <section className='review-section section-lg-space'>
      <Container fluid>
        <div className='about-us-title text-center'>
          <h4 className='text-content'>{themeOption?.about_us?.testimonial?.sub_title}</h4>
          <h2 className='center'>{themeOption?.about_us?.testimonial?.title}</h2>
        </div>
        <Row>
          <Col xs='12'>
            <Slider className='slider-4-half product-wrapper' {...reviewSectionSlider}>
              {themeOption?.about_us?.testimonial?.reviews.map((data, index) => (
                <div className='reviewer-box' key={index}>
                  <div className='icon'>
                    <RiDoubleQuotesR />
                  </div>
                  <h3>{data?.title}</h3>
                  <p>{data?.review}</p>
                  <div className='reviewer-profile'>
                    <div className='reviewer-image'>
                      <img height={74.53} width={74.53} src={data?.profile_image_url} alt="image" />
                    </div>
                    <div className='reviewer-name'>
                      <h4>{data?.name}</h4>
                      <h6>{data?.designation}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ReviewSection;
