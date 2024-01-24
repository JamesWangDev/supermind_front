'use client';
import { useContext } from 'react';
import { Col } from 'reactstrap';
import Image from 'next/image';
import Breadcrumb from '../Common/Breadcrumb';
import WrapperComponent from '../Common/WrapperComponent';
import NotFoundImage from '../../../public/assets/images/inner-page/404.png';
import Btn from '@/Elements/Buttons/Btn';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useRouter } from 'next/navigation';
const NotFoundComponent = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const router = useRouter();
  return (
    <>
      <Breadcrumb title={'404'} subNavigation={[{ name: '404' }]} />
      <WrapperComponent classes={{ sectionClass: 'section-404 section-lg-space' }} customCol>
        <Col xs='12'>
          <div className='image-404'>
            <Image src={NotFoundImage} className='img-fluid' alt='error page' height={483.52} width={392.61} />
          </div>
        </Col>
        <Col xs={12}>
          <div className='contain-404'>
            <h3 className='text-content'>{themeOption?.error_page?.error_page_content}</h3>
            <Btn id='back_button' className='btn-md text-white theme-bg-color mt-4 mx-auto'  title={themeOption?.error_page?.back_button_text} onClick={()=>router.back()} />
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default NotFoundComponent;
