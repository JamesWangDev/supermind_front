import { Col, Form, Input, Row } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import WrapperComponent from '../Common/WrapperComponent';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import basketImage from '../../../public/assets/images/basket.png';
import Image from 'next/image';

const RomeNewsLetter = ({ dataAPI }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <WrapperComponent classes={{ sectionClass: 'newsletter-section-2 section-b-space' }} noRowCol={true}>
      <Col xs={12}>
        <div className='newsletter-box hover-effect bg-size' style={{ backgroundImage: `url(${dataAPI?.image_url})` }}>
          <Row>
            <Col xxl={8} xl={7}>
              <div className='newsletter-detail p-center-left text-white'>
                <div>
                  <h2>{dataAPI?.title}</h2>
                  <h4>{dataAPI?.sub_title}</h4>
                  <Form className='row g-2'>
                    <Col sm={10} xs={12}>
                      <div className='newsletter-form'>
                        <Input type='email' id='email' placeholder='Enter your email' />
                        <Btn className='bg-white theme-color btn-md fw-500 submit-button'>
                          <span>{t('Subscribe')}</span>
                        </Btn>
                      </div>
                    </Col>
                  </Form>
                </div>
              </div>
            </Col>

            <Col xxl={4} xl={5} className='d-xl-block d-none'>
              <div className='shape-box'>
                <Image src={basketImage} alt='basket' className='img-fluid image-1' height={294} width={512} />
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </WrapperComponent>
  );
};

export default RomeNewsLetter;
