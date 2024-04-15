'use client';
import Image from 'next/image';
import { Col } from 'reactstrap';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import UpdatePasswordForm from './UpdatePasswordForm';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import forgotPasswordImage from '../../../../public/assets/images/inner-page/forgot.png';
import AuthHeadings from '../Common/AuthHeadings';

const UpdatePasswordContent = () => {
  return (
    <>
      <Breadcrumb title={'UpdatePassword'} subNavigation={[{ name: 'UpdatePassword' }]} />
      <WrapperComponent classes={{ sectionClass: 'log-in-section section-b-space forgot-section', fluidClass: 'w-100' }} customCol={true}>
        <Col xxl={6} xl={5} lg={6} className='d-lg-block d-none ms-auto'>
          <div className='image-contain'>
            <Image src={forgotPasswordImage} className='img-fluid' alt='forgot' />
          </div>
        </Col>

        <Col xxl={4} xl={5} lg={6} sm={8} className='mx-auto'>
          <div className='d-flex align-items-center justify-content-center h-100'>
            <div className='log-in-box'>
              <AuthHeadings heading1={'WelcomeToFastkart'} heading2={'Updateyourpassword'} />
              <div className='input-box'>
                <UpdatePasswordForm />
              </div>
            </div>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default UpdatePasswordContent;
