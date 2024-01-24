import Image from 'next/image';
import { Col, Row } from 'reactstrap';
import ProductDetailsTab from '../Common/ProductDetailsTab';
import ProductDetailSidebar from '../Common/ProductDetailSidebar';
import MainProductContent from '../Common/MainProductContent';
import WrapperComponent from '@/Components/Common/WrapperComponent';

const ProductSticky = ({ productState, setProductState }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section section-b-space' }} customCol={true}>
      <Col xxl={9} xl={8} lg={7}>
        <Row className='g-4'>
          <Col xl={6} lg={12}>
            <div className='product-left-box'>
              <Row className='g-sm-4 g-2'>
                {productState?.product?.product_galleries?.map((elem, i) => (
                  <Col xl={12} md={6} key={i}>
                    <div className='slider-image'>
                      <img src={elem?.original_url} alt={elem?.name} className='img-fluid' height={579} width={579} />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <MainProductContent productState={productState} setProductState={setProductState} />
          <ProductDetailsTab productState={productState} />
        </Row>
      </Col>
      <ProductDetailSidebar productState={productState} />
    </WrapperComponent>
  );
};

export default ProductSticky;
