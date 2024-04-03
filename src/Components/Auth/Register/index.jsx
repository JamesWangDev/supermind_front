'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Col } from 'reactstrap';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import signUpImage from '../../../../public/assets/images/inner-page/sign-up.png';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import RegisterForm from './RegisterForm';
import AuthHeadings from '../Common/AuthHeadings';

const RegisterContent = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      {/* <Breadcrumb title={'Register'} subNavigation={[{ name: 'Register' }]} /> */}
      <WrapperComponent classes={{ sectionClass: 'log-in-section section-b-space section-t-space', fluidClass: 'w-100' }} customCol={true}>
        <Col xxl={6} xl={5} lg={6} className='d-lg-block d-none ms-auto'>
          <div className='image-contain'>
            <Image src={signUpImage} className='img-fluid' alt='sign-up' height={465} width={550} />
          </div>
        </Col>

        <Col xxl={4} xl={5} lg={6} sm={8} className='mx-auto'>
          <div className='log-in-box'>
            <AuthHeadings heading1={'WelcomeToFastkart'} heading2={'CreateNewAccount'} />

            <div className='input-box'>
              <RegisterForm />
            </div>

            <div className='other-log-in'>
              <h6>{t('or')}</h6>
            </div>

            <div className='sign-up-box'>
              <h4>{t('Alreadyhaveanaccount')}?</h4>
              <Link href={`/${i18Lang}/auth/login`}>{t('LogIn')}</Link>
            </div>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default RegisterContent;
