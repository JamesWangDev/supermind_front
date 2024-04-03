import React, { useContext } from 'react';
import MainContent from '.';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ProductSection4 from '@/Components/ParisTheme/ProductSections/ProductSection4';
import OfferBanner from '@/Components/TokyoTheme/OfferBanner';
import { LeafSVG } from '@/Components/Common/CommonSVG';
import ProductIdsContext from '@/Helper/ProductIdsContext';

const BerlinSection = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <>
      <MainContent dataAPI={dataAPI} ProductData={filteredProduct} />

      <OfferBanner dataAPI={dataAPI?.full_width_banner} height={343} width={1524} />

      {dataAPI?.product_list_1?.status && (
        <WrapperComponent>
          <ProductSection4 dataAPI={dataAPI?.product_list_1} ProductData={filteredProduct} svgUrl={<LeafSVG className='icon-width' />} customClass='title' />
        </WrapperComponent>
      )}
    </>
  );
};

export default BerlinSection;
