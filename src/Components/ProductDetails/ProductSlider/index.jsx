import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import AddProductDetail from '../Common/AddProductDetail';
import PaymentOtions from '../Common/PaymentOtions';
import ProductInformation from '../Common/ProductInformation';
import ProductDetailsTab from '../Common/ProductDetailsTab';
import ProductDetailAction from '../Common/ProductDetailAction';
import OfferTimer from '../Common/OfferTimer';
import ProductDetails from '../Product4Image/ProductDetails';
import ProductAttribute from '../Common/ProductAttribute/ProductAttribute';
import ProductDetailSidebar from '../Common/ProductDetailSidebar';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import TopSlider from './TopSlider';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import ProductSocial from '../Common/ProductSocial';
import ProductBundle from '../Common/ProductBundle';
import ProductDeliveryInformation from '../Common/ProductDeliveryInformation';

const ProductSlider = ({ productState, setProductState }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      <TopSlider productState={productState} />
      <WrapperComponent classes={{ sectionClass: 'product-section section-b-space' }} customCol={true}>
        <Col xxl={9} xl={8} lg={7}>
          <Row className='g-4'>
            <Col xs={12}>
              <div className='right-box-contain full-width-right-box'>
                <ProductDetails productState={productState} />
                {productState?.product?.type == 'classified' && <ProductAttribute productState={productState} setProductState={setProductState} />}
                {productState?.product?.sale_starts_at && productState?.product?.sale_expired_at && <OfferTimer productState={productState} />}

                <ProductDetailAction productState={productState} setProductState={setProductState} />
                <AddProductDetail productState={productState} />
                <ProductInformation productState={productState} />
                {productState?.product?.estimated_delivery_text || (productState?.product?.return_policy_text && productState?.product?.is_return) ? (
                  <ProductDeliveryInformation productState={productState} />
                ) : null}
                <PaymentOtions productState={productState} />

                {themeOption?.product?.social_share && productState?.product?.social_share ? <ProductSocial productState={productState} /> : null}
              </div>
            </Col>
            {productState?.product?.cross_sell_products?.length > 0 ? (
              <Col xs={12} className='related-product-2'>
                <ProductBundle productState={productState} />
              </Col>
            ) : null}

            <ProductDetailsTab productState={productState} />
          </Row>
        </Col>
        <ProductDetailSidebar productState={productState} />
      </WrapperComponent>
    </>
  );
};

export default ProductSlider;
