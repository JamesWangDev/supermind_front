import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import RatioImage from '@/Utils/RatioImage';

const AboutUsImage = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <Col xl='6' xs='12'>
      <Row className='g-sm-4 g-2 ratio_148_1'>
        <Col sm='6' className='d-sm-block d-none'>
          <div className='fresh-image-2'>
            <div>
              <RatioImage className='bg-img img-fluid' height={100} width={100} src={themeOption?.about_us?.about?.content_left_image_url} alt='about-us-1' />
            </div>
          </div>
        </Col>
        <Col sm='6'>
          <div className='fresh-image'>
            <div>
              <RatioImage className='bg-img' height={100} width={100} src={themeOption?.about_us?.about?.content_right_image_url} alt='about-us-2' />
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default AboutUsImage;
