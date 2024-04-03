import Image from 'next/image';
import { Col, Row } from 'reactstrap';
import contactUsImage from '../../../public/assets/images/inner-page/contact-us.png';
import { useContext } from 'react';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { RiBuildingLine, RiMailLine, RiMapPin2Line, RiPhoneLine, RiSmartphoneLine } from 'react-icons/ri';

const ContactLeftSideBox = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Col lg={6}>
      <div className='left-sidebar-box'>
        <Row>
          <Col xl={12}>
            <div className='contact-image'>
              <Image src={themeOption?.contact_us?.imageUrl || contactUsImage} className='img-fluid' alt='contact' height={461} width={386} />
            </div>
          </Col>
          <Col xl={12}>
            <div className='contact-title'>
              <h3>{t('GetInTouch')}</h3>
            </div>

            <div className='contact-detail'>
              <Row className='g-4'>
                <Col xxl={6} lg={12} sm={6}>
                  <div className='contact-detail-box'>
                    <div className='contact-icon'>
                      <RiPhoneLine />
                    </div>
                    <div className='contact-detail-title'>
                      <h4>{themeOption?.contact_us?.detail_1?.label}</h4>
                    </div>

                    <div className='contact-detail-contain'>
                      <p>{themeOption?.contact_us?.detail_1?.text}</p>
                    </div>
                  </div>
                </Col>

                <Col xxl={6} lg={12} sm={6}>
                  <div className='contact-detail-box'>
                    <div className='contact-icon'>
                      <RiMailLine />
                    </div>
                    <div className='contact-detail-title'>
                      <h4>{themeOption?.contact_us?.detail_2?.label}</h4>
                    </div>

                    <div className='contact-detail-contain'>
                      <p>{themeOption?.contact_us?.detail_2?.text}</p>
                    </div>
                  </div>
                </Col>

                <Col xxl={6} lg={12} sm={6}>
                  <div className='contact-detail-box'>
                    <div className='contact-icon'>
                      <RiMapPin2Line />
                    </div>
                    <div className='contact-detail-title'>
                      <h4>{themeOption?.contact_us?.detail_3?.label}</h4>
                    </div>

                    <div className='contact-detail-contain'>
                      <p>{themeOption?.contact_us?.detail_3?.text}</p>
                    </div>
                  </div>
                </Col>

                <Col xxl={6} lg={12} sm={6}>
                  <div className='contact-detail-box'>
                    <div className='contact-icon'>
                      <RiBuildingLine />
                    </div>
                    <div className='contact-detail-title'>
                      <h4>{themeOption?.contact_us?.detail_4?.label}</h4>
                    </div>

                    <div className='contact-detail-contain'>
                      <p>{themeOption?.contact_us?.detail_4?.text}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ContactLeftSideBox;
