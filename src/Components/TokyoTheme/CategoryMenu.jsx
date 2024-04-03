import React from 'react';
import ProductSection2 from '../ParisTheme/ProductSections/ProductSection2';
import WrapperComponent from '../Common/WrapperComponent';
import { osakaCategoryOption } from '../../../Data/SliderSettingsData';

const CategoryMenu = ({ dataAPI }) => {
  return (
    <WrapperComponent>
      <ProductSection2 dataAPI={dataAPI} classes={{ link: 'category-box-2', sliderOption: osakaCategoryOption }} />
    </WrapperComponent>
  );
};

export default CategoryMenu;
