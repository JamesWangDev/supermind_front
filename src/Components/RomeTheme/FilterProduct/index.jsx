import React, { useContext, useState } from 'react';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ProductNavLink from './ProductNavLink';
import ProductTab from './ProductTab';
import CategoryContext from '@/Helper/CategoryContext';

const FilterProduct = ({ dataAPI }) => {
  const [activeTab, setActiveTab] = useState(1);
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section' }}>
      <ProductNavLink setActiveTab={setActiveTab} activeTab={activeTab} CategoryData={categoryData} dataAPI={dataAPI} />
      <ProductTab activeTab={typeof activeTab == 'object' ? activeTab?.id : activeTab} />
    </WrapperComponent>
  );
};

export default FilterProduct;
