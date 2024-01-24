import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from '../ParisTheme/OfferBanner';
import SkeletonWrapper from '../Common/SkeletonWrapper';

const HomeBannerOsaka = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section pt-2', row: 'g-4' }} customCol={true}>
      <SkeletonWrapper classes={{ colProps: { xl: 9, lg: 8 }, divClass: 'home-contain h-100 skeleton-banner-xl ratio_60' }}>
        <OfferBanner ratioImage classes={{ customHoverClass: 'home-contain h-100' }} imgUrl={dataAPI?.main_banner?.image_url} elem={dataAPI?.main_banner} />
      </SkeletonWrapper>

      <SkeletonWrapper classes={{ colProps: { xl: 3, lg: 4 }, colClass: 'd-lg-inline-block d-none ratio_156', divClass: 'home-contain h-100 skeleton-banner-vertical' }}>
        <OfferBanner ratioImage classes={{ customClass: "h-100", customHoverClass: 'home-contain h-100' }} imgUrl={dataAPI?.sub_banner_1?.image_url} elem={dataAPI?.sub_banner_1} />
      </SkeletonWrapper>
    </WrapperComponent>
  );
};

export default HomeBannerOsaka;
