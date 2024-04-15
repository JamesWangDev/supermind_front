import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from '../ParisTheme/OfferBanner';
import SkeletonWrapper from '../Common/SkeletonWrapper';

const HomeBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section home-section-ratio pt-2', row: 'g-4' }} customCol={true}>
      <SkeletonWrapper classes={{ colProps: { xxl: 3, lg: 4, sm: 6 }, colClass: 'ratio_180 d-sm-block d-none', divClass: 'home-contain rounded skeleton-banner-vertical' }}>
        <OfferBanner classes={{ customClass: 'home-contain rounded', customHoverClass: 'h-100 b-top' }} imgUrl={dataAPI?.sub_banner_1?.image_url} ratioImage={true} elem={dataAPI?.sub_banner_1}/>
      </SkeletonWrapper>

      <SkeletonWrapper classes={{ colProps: { xxl: 6, lg: 8 }, colClass: 'order-xxl-0 ratio_87', divClass: 'home-contain rounded skeleton-banner-xl' }}>
        <OfferBanner classes={{ customClass: 'home-contain rounded', customHoverClass: 'h-100' }} imgUrl={dataAPI?.main_banner?.image_url} ratioImage={true} elem={dataAPI?.main_banner} />
      </SkeletonWrapper>

      <SkeletonWrapper
        classes={{ colProps: { xxl: 3, xl: 4, sm: 6 }, colClass: 'ratio_180 custom-ratio d-xxl-block d-lg-none d-sm-block d-none', divClass: 'home-contain rounded skeleton-banner-vertical' }}>
        <OfferBanner classes={{ customClass: 'home-contain rounded' ,customHoverClass: 'b-top' }} imgUrl={dataAPI?.sub_banner_2?.image_url} ratioImage={true} elem={dataAPI?.sub_banner_2} />
      </SkeletonWrapper>
    </WrapperComponent>
  );
};

export default HomeBanner;
