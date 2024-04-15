import React, { useContext } from 'react';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { Col } from 'reactstrap';
import Slider from 'react-slick';
import { topBarContentSlider } from '../../../../Data/SliderSettingsData';

const TopbarSlider = ({ customClass }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      {customClass ? (
        <div className='notification-slider'>
          <Slider {...topBarContentSlider}>
            {themeOption?.header?.top_bar_content.length > 0 &&
              themeOption?.header?.top_bar_content?.map((elem, i) => (
                <div key={i}>
                  <div className={`timer-notification ${customClass}`}>
                    <h6>
                      <strong className='me-1'>{elem?.content}</strong>
                    </h6>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      ) : (
        <Col lg={9} xxl={6} className='d-lg-block d-none'>
          <div className='header-offer'>
            <div className='notification-slider no-arrow'>
              <Slider {...topBarContentSlider}>
                {themeOption?.header?.top_bar_content.length > 0 &&
                  themeOption?.header?.top_bar_content?.map((elem, i) => (
                    <div key={i}>
                      <div className={`timer-notification`}>
                        <h6>
                          <div dangerouslySetInnerHTML={{ __html: elem?.content }} />
                        </h6>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </Col>
      )}
    </>
  );
};

export default TopbarSlider;
