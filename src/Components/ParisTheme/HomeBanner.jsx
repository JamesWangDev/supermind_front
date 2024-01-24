import Slider from 'react-slick';
import { themeSec2BannerSlider } from '../../../Data/SliderSettingsData';
import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from './OfferBanner';

const HomeBanner = ({ bannersData }) => {
  const banners = bannersData.filter((elem) => (elem.status == true ? true : false));
  return (
    <WrapperComponent classes={{ sectionClass: 'banner-section ratio_60' }} noRowCol={true}>
      <div className='banner-slider'>
        <Slider {...themeSec2BannerSlider}>
          {banners.map((elem, i) => (
            <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect' }} imgUrl={elem?.image_url} key={i} elem={elem} />
          ))}
        </Slider>
      </div>
    </WrapperComponent>
  );
};

export default HomeBanner;
