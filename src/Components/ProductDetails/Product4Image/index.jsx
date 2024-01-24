import { Col, Row } from 'reactstrap';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ProductDetailImage from '../Common/ProductDetailImage';
import ProductDetailsTab from '../Common/ProductDetailsTab';
import MainProductContent from '../Common/MainProductContent';

const Product4Image = ({ productState, setProductState }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section section-b-space', row: 'g-4' }} customCol={true}>
      <Col xl={6}>
        <div className='product-left-box'>
          <Row className='g-sm-4 g-2'>
            {productState?.product?.product_galleries?.map((image, i) => (
              <ProductDetailImage imageProps={{ height: 372, width: 372, imageUrl: image?.original_url }} key={i} />
            ))}
          </Row>
        </div>
      </Col>
      <MainProductContent productState={productState} setProductState={setProductState} />
      <ProductDetailsTab productState={productState} />
    </WrapperComponent>
  );
};

export default Product4Image;
