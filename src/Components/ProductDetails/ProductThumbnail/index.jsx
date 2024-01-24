import { Col, Row } from 'reactstrap';
import ProductDetailsTab from '../Common/ProductDetailsTab';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ProductThumbnailSlider from './ProductThumbnailSlider';
import ProductDetailSidebar from '../Common/ProductDetailSidebar';
import MainProductContent from '../Common/MainProductContent';
import ProductDetailAccordion from '../Common/ProductDetailAccordion';

const ProductThumbnail = ({ productState, setProductState, customTab }) => {
  return (
    <>
      <WrapperComponent classes={{ sectionClass: 'product-section section-b-space' }} customCol={true}>
        <Col xxl={9} xl={8} lg={7}>
          <Row className='g-4'>
            <ProductThumbnailSlider productState={productState} setProductState={setProductState} />
            <MainProductContent productState={productState} setProductState={setProductState} />
            {customTab ? <ProductDetailAccordion productState={productState} /> : <ProductDetailsTab productState={productState} setProductState={setProductState} />}
          </Row>
        </Col>
        <ProductDetailSidebar productState={productState} setProductState={setProductState} />
      </WrapperComponent>
    </>
  );
};

export default ProductThumbnail;
