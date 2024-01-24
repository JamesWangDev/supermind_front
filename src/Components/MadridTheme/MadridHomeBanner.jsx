import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from '../ParisTheme/OfferBanner';

const MadridHomeBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section-2 home-section-bg pt-0 overflow-hidden', fluidClass: 'p-0' }} colProps={{ xs: 12 }}>
      <div className='slider-animate skeleton-banner-xl'>
        <OfferBanner classes={{ customHoverClass: 'home-contain rounded-0 p-0' }} imgUrl={dataAPI?.image_url} elem={dataAPI} />
      </div>
    </WrapperComponent>
  );
};

export default MadridHomeBanner;
