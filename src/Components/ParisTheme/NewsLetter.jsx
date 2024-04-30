import { Col, Container, Input, Row } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import WrapperComponent from '../Common/WrapperComponent';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { RiArrowRightLine, RiMailLine } from 'react-icons/ri';

const NewsLetter = ({ dataAPI }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    // <WrapperComponent classes={{ sectionClass: 'newsletter-section' }} noRowCol={true}>
      <section className='newsletter-section'>
        <div className='newsletter-box newsletter-box-2' style={{ backgroundImage: `url(${dataAPI?.image_url})` }}>
          <div className='newsletter-contain py-5'>
            <Container fluid={true}>
              <Row>
                <Col lg={5} md={7} sm={9} xxl={6} className='offset-xxl-1 offset-md-1'>
                  <div className='newsletter-detail'>
                    <h2>{dataAPI?.title}</h2>
                    <h5>{dataAPI?.sub_title}</h5>
                    <div className='input-box'>
                      <Input type='email' placeholder='Enter Your Email' />
                      {/* <div className="mail-icon">
                        <RiMailLine />
                      </div> */}
                      <Btn className='sub-btn'>
                        <span className='d-sm-block d-none'>{t('Subscribe')}</span>
                        <RiArrowRightLine />
                      </Btn>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </section>
    // </WrapperComponent>
  );
};

export default NewsLetter;
