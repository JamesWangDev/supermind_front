import React, { useContext } from 'react';
import { Col } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import ProductSection1 from '../ParisTheme/ProductSections/ProductSection1';
import ProductSection4 from '../ParisTheme/ProductSections/ProductSection4';
import RightSidebar from './RightSidebar';
import { CakeSVG } from '../Common/CommonSVG';
import ProductIdsContext from '@/Helper/ProductIdsContext';

const ProductCard = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <WrapperComponent classes={{ row: 'g-3' }} customCol={true}>
      <Col xxl={dataAPI?.main_content?.sidebar?.status ? 9 : 12} xl={dataAPI?.main_content?.sidebar?.status ? 8 : 12}>
        {dataAPI?.main_content?.section1_products?.status && (
          <ProductSection1
            ProductData={filteredProduct}
            dataAPI={dataAPI?.main_content?.section1_products}
            svgUrl={<CakeSVG className='icon-width' />}
            noCustomClass={true}
            classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }}
          />
        )}
        {dataAPI?.main_content?.section2_slider_products?.status && (
          <ProductSection4 ProductData={filteredProduct} dataAPI={dataAPI?.main_content?.section2_slider_products} svgUrl={<CakeSVG className='icon-width' />} customClass={'title section-t-space'} />
        )}
        {dataAPI?.main_content?.section3_products?.status && (
          <ProductSection1
            ProductData={filteredProduct}
            dataAPI={dataAPI?.main_content?.section3_products}
            svgUrl={<CakeSVG className='icon-width' />}
            noCustomClass={true}
            customClass={'title section-t-space'}
            classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }}
          />
        )}
        {dataAPI?.main_content?.section4_products?.status && (
          <ProductSection1
            ProductData={filteredProduct}
            dataAPI={dataAPI?.main_content?.section4_products}
            svgUrl={<CakeSVG className='icon-width' />}
            noCustomClass={true}
            customClass={'title section-t-space'}
            classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }}
          />
        )}
      </Col>
      {dataAPI?.main_content?.sidebar?.status && (
        <Col xxl={3} xl={4} className='d-none d-xl-block'>
          <RightSidebar dataAPI={dataAPI?.main_content?.sidebar?.right_side_banners} />
        </Col>
      )}
    </WrapperComponent>
  );
};

export default ProductCard;
