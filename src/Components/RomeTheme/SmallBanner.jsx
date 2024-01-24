import OfferBanner from '../ParisTheme/OfferBanner';
import SkeletonWrapper from '../Common/SkeletonWrapper';

const SmallBanner = ({ dataAPI }) => {
  return (
    <SkeletonWrapper classes={{ colProps: { xxl: 12, sm: 6 }, divClass: 'home-contain skeleton-banner-sm' }}>
      <OfferBanner classes={{ customClass: 'home-contain' }} ratioImage={true} imgUrl={dataAPI?.image_url} elem={dataAPI} customRatioClass='img-fluid' />
    </SkeletonWrapper>
  );
};

export default SmallBanner;
