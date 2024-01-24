import React, { useContext } from 'react';
import WrapperComponent from '../Common/WrapperComponent';
import ProductSection1 from '../ParisTheme/ProductSections/ProductSection1';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import { productPageRelatedSliderOptions } from '../../../Data/SliderSettingsData';

const TopProducts = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <>
      <WrapperComponent classes={{ sectionClass: 'product-section' }} noRowCol={true}>
        <ProductSection1
          dataAPI={dataAPI?.products_list_1}
          ProductData={filteredProduct}
          noCustomClass={true}
          classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }}
          customSliderOption={productPageRelatedSliderOptions}
        />
      </WrapperComponent>
    </>
  );
};

export default TopProducts;
