import WrapperComponent from '../Common/WrapperComponent';
import SingleBanner from '../ParisTheme/SingleBanner';

const OfferBanner = ({ dataAPI, height, width, classes }) => {
  return (
    <WrapperComponent classes={classes}>
      <SingleBanner image_url={dataAPI?.image_url} height={height} width={width} dataAPI={dataAPI} />
    </WrapperComponent>
  );
};

export default OfferBanner;
