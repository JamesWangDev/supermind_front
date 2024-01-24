import DeliveryBanner from '../MadridTheme/DeliveryBanner';
import SliderProduct from './SliderProduct';
import WrapperComponent from '../Common/WrapperComponent';
import SingleBanner from '../ParisTheme/SingleBanner';
import ProductWrapper from '../MadridTheme/ProductWrapper';
import NewsLetter from '../ParisTheme/NewsLetter';
import { osakaSliderOption } from '../../../Data/SliderSettingsData';

const OtherDenverSection = ({ dataAPI }) => {
  return (
    <>
      {dataAPI?.two_column_banners?.status && <DeliveryBanner dataAPI={dataAPI?.two_column_banners} />}

      <SliderProduct dataAPI={dataAPI?.slider_product_with_banner} />

      {dataAPI?.coupon_banner?.status && (
        <WrapperComponent noRowCol={true}>
          <SingleBanner image_url={dataAPI?.coupon_banner?.image_url} height={139} width={1585} dataAPI={dataAPI?.coupon_banner} />
        </WrapperComponent>
      )}

      {dataAPI?.products_list_2?.status && (
        <ProductWrapper
          dataAPI={dataAPI?.products_list_2}
          noSectionClass={true}
          noWrapperRowCol={true}
          noCustomClass={true}
          classObj={{ productStyle: 'product-solid', productBoxClass: 'product-box-bg' }}
          customSliderOption={osakaSliderOption}
        />
      )}

      {dataAPI?.products_list_3?.status && (
        <ProductWrapper
          dataAPI={dataAPI?.products_list_3}
          noSectionClass={true}
          noWrapperRowCol={true}
          noCustomClass={true}
          classObj={{ productStyle: 'product-solid', productBoxClass: 'product-box-bg' }}
          customSliderOption={osakaSliderOption}
        />
      )}

      {dataAPI?.news_letter?.status && <NewsLetter dataAPI={dataAPI?.news_letter} />}
    </>
  );
};

export default OtherDenverSection;
