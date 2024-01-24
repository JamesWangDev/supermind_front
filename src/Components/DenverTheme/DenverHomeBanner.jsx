import React from 'react';
import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from '../ParisTheme/OfferBanner';

const DenverHomeBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section-2 home-section-bg pt-0 overflow-hidden', fluidClass: 'p-0' }} colProps={{ xs: 12 }}>
      <div className='slider-animate skeleton-banner-xl'>
        <OfferBanner classes={{ customHoverClass: 'home-contain rounded-0 p-0' }} imgUrl={dataAPI?.home_banner?.main_banner?.image_url} elem={dataAPI?.home_banner?.main_banner} />
      </div>
    </WrapperComponent>
  );
};

export default DenverHomeBanner;
