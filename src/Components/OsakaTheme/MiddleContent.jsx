import React, { useContext } from 'react';
import ProductSection1 from '../ParisTheme/ProductSections/ProductSection1';
import OfferBanner from '../ParisTheme/OfferBanner';
import DetailedBanner from './DetailedBanner';
import WrapperComponent from '../Common/WrapperComponent';
import { LeafSVG } from '../Common/CommonSVG';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import { osakaFullSlider, osakaSliderOption } from '../../../Data/SliderSettingsData';

const MiddleContent = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <>
      {dataAPI?.products_list_1?.status && (
        <WrapperComponent noRowCol={true}>
          <ProductSection1
            ProductData={filteredProduct}
            svgUrl={<LeafSVG className='icon-width' />}
            dataAPI={dataAPI?.products_list_1}
            noCustomClass={true}
            customSliderOption={osakaFullSlider}
            classObj={{ productStyle: 'product-modern', productBoxClass: '' }}
          />
        </WrapperComponent>
      )}

      {dataAPI?.offer_banner?.status && (
        <WrapperComponent colProps={{ xs: 12 }}>
          <OfferBanner classes={{ customHoverClass: 'offer-box hover-effect' }} imgUrl={dataAPI?.offer_banner?.image_url} elem={dataAPI?.offer_banner} />
        </WrapperComponent>
      )}

      {dataAPI?.products_list_2?.status && (
        <WrapperComponent noRowCol={true}>
          <ProductSection1
            ProductData={filteredProduct}
            svgUrl={<LeafSVG className='icon-width' />}
            dataAPI={dataAPI?.products_list_2}
            noCustomClass={true}
            customSliderOption={osakaFullSlider}
            classObj={{ productStyle: 'product-modern', productBoxClass: '' }}
          />
        </WrapperComponent>
      )}

      {dataAPI?.product_bundles?.status && (
        <WrapperComponent noRowCol={true}>
          <DetailedBanner dataAPI={dataAPI?.product_bundles?.bundles} />
        </WrapperComponent>
      )}
    </>
  );
};

export default MiddleContent;
