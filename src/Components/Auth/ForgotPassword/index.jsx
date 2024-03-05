'use client';
import { Col } from 'reactstrap';
import Image from 'next/image';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ForgotPasswordForm from './ForgotPasswordForm';
import forgotPasswordImage from '../../../../public/assets/images/inner-page/forgot.png';
import AuthHeadings from '../Common/AuthHeadings';

const ForgotPasswordContent = () => {
  return (
    <>
      <Breadcrumb title={'ForgotPassword'} subNavigation={[{ name: 'ForgotPassword' }]} />
      <WrapperComponent classes={{ sectionClass: 'log-in-section section-b-space section-t-space forgot-section', fluidClass: 'w-100' }} customCol={true}>
        <Col xxl={6} xl={5} lg={6} className='d-lg-block d-none ms-auto'>
          <div className='image-contain'>
            <Image src={forgotPasswordImage} className='img-fluid' alt='forgotPasswordImage' />
          </div>
        </Col>

        <Col xxl={4} xl={5} lg={6} sm={8} className='mx-auto'>
          <div className='d-flex align-items-center justify-content-center h-100'>
            <div className='log-in-box'>
              <AuthHeadings heading1={'WelcomeToFastkart'} heading2={'Forgotyourpassword'} />
              <div className='input-box'>
                <ForgotPasswordForm />
              </div>
            </div>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default ForgotPasswordContent;
