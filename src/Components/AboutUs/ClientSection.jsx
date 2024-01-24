import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import Image from 'next/image';
import { useContext } from 'react';
import Slider from 'react-slick';
import { clientSectionSlider } from '../../../Data/SliderSettingsData';
import WrapperComponent from '../Common/WrapperComponent';

const ClientSection = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <WrapperComponent classes={{ sectionClass: 'client-section section-lg-space' }} colProps={{ xs: 12 }}>
      <div className='about-us-title text-center'>
        <h4>{ themeOption?.about_us?.clients?.sub_title }</h4>  
        <h2 className='center'>{ themeOption?.about_us?.clients?.title }</h2>
      </div>
      <div className='product-wrapper'>
        <Slider {...clientSectionSlider}>
          {themeOption?.about_us?.clients?.content.map((data, index) => (
            <div className='clint-contain' key={index}>
              <div className='client-icon'>
                <Image height={79.06} width={58.5} src={data?.icon} alt={data?.title} />
              </div>
              <h4>{data?.title}</h4>
              <p>{data?.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </WrapperComponent>
  );
};

export default ClientSection;
