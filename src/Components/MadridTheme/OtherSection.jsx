import ProductWrapper from './ProductWrapper';
import MadridTwoBanner from './MadridTwoBanner';
import DeliveryBanner from './DeliveryBanner';
import WrapperComponent from '../Common/WrapperComponent';
import FeatureBlog from '../ParisTheme/FeatureBlog';
import { madridFeatureBlog, madridFullSlider } from '../../../Data/SliderSettingsData';
import CustomHeading from '../Common/CustomHeading';
import NoDataFound from '../Common/NoDataFound';

const OtherSection = ({ dataAPI }) => {
  return (
    <>
      {dataAPI?.products_list_2?.status && (
        <ProductWrapper
          dataAPI={dataAPI?.products_list_2}
          noCustomClass={true}
          classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }}
          customSliderOption={madridFullSlider}
        />
      )}

      {dataAPI?.products_list_3?.status && (
        <ProductWrapper
          dataAPI={dataAPI?.products_list_3}
          noCustomClass={true}
          classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }}
          customSliderOption={madridFullSlider}
        />
      )}

      {dataAPI?.two_column_banners?.status && <MadridTwoBanner dataAPI={dataAPI} />}

      {dataAPI?.products_list_4?.status && (
        <ProductWrapper
          dataAPI={dataAPI?.products_list_4}
          noCustomClass={true}
          classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }}
          customSliderOption={madridFullSlider}
        />
      )}

      {dataAPI?.products_list_5?.status && (
        <ProductWrapper
          dataAPI={dataAPI?.products_list_5}
          noCustomClass={true}
          classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }}
          customSliderOption={madridFullSlider}
        />
      )}

      {dataAPI?.delivery_banners?.status && <DeliveryBanner dataAPI={dataAPI?.delivery_banners} />}

      {dataAPI?.products_list_6?.status && (
        <ProductWrapper
          dataAPI={dataAPI?.products_list_6}
          noCustomClass={true}
          classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }}
          customSliderOption={madridFullSlider}
        />
      )}

      {dataAPI?.products_list_7?.status && (
        <ProductWrapper
          dataAPI={dataAPI?.products_list_7}
          noCustomClass={true}
          classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }}
          customSliderOption={madridFullSlider}
        />
      )}

      {dataAPI?.featured_blogs?.status && (
        <WrapperComponent classes={{ sectionClass: 'blog-section section-b-space' }} noRowCol={true}>
          <CustomHeading title={dataAPI?.featured_blogs?.title} />
          {dataAPI?.featured_blogs?.blog_ids?.length > 0 ? (
            <FeatureBlog dataAPI={dataAPI?.featured_blogs} classes={{ sliderClass: 'slider-3-blog arrow-slider slick-height', sliderOption: madridFeatureBlog, ratioClass: 'ratio_65' }} />
          ) : (
            <NoDataFound data={{ customClass: 'bg-second border-30 no-data-added', title: 'No Blog Found' }} />
          )}
        </WrapperComponent>
      )}
    </>
  );
};

export default OtherSection;
