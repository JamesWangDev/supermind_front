'use client';
import { useEffect, useMemo } from 'react';
import CustomHeading from '@/Components/Common/CustomHeading';
import NavTabTitles from '@/Components/Common/NavTabs';

const ProductNavLink = ({ dataAPI, CategoryData, setActiveTab, activeTab }) => {
  const filterCategory = useMemo(() => {
    return CategoryData?.filter((el) => dataAPI?.category_ids?.includes(el.id));
  }, [CategoryData, dataAPI]);

  useEffect(() => {
    if (filterCategory?.length > 0) {
      setActiveTab((prev) => {
        return filterCategory[0];
      });
    }
  }, []);
  return (
    <CustomHeading title={'OurProducts'} customClass={'title-flex-2 title'}>
      <NavTabTitles classes={{ navClass: 'nav-tabs tab-style-color-2 tab-style-color' }} setActiveTab={setActiveTab} activeTab={activeTab} titleList={[...filterCategory]} />
    </CustomHeading>
  );
};

export default ProductNavLink;
