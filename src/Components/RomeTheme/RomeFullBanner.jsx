import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from '../ParisTheme/OfferBanner';

const RomeFullBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'banner-section' }} colProps={{ xs: 12 }}>
      <OfferBanner classes={{customClass:"banner-contain hover-effect"}}  imgUrl={dataAPI?.image_url}  elem={dataAPI} customRatioClass="img-fluid" />
    </WrapperComponent>
  );
};

export default RomeFullBanner;
