import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import ProductDetailAction from '../ProductDetailAction';
import Avatar from '@/Components/Common/Avatar';
import { placeHolderImage } from '../../../../../Data/CommonPath';
import SettingContext from '@/Helper/SettingContext';

const ShowProduct = ({ productState, setProductState }) => {
  const { convertCurrency } = useContext(SettingContext);
  return (
    <div className='sticky-bottom-cart'>
      <div className='container-fluid-lg'>
        <Row>
          <Col xs={12}>
            <div className='cart-content'>
              <div className='product-image'>
                <Avatar
                  data={productState?.selectedVariation?.variation_image ?? productState?.product?.product_thumbnail}
                  placeHolder={placeHolderImage}
                  name={productState?.selectedVariation ? productState?.selectedVariation?.name : productState?.product?.name}
                />
                <div className='content'>
                  <h5>{productState?.selectedVariation ? productState?.selectedVariation?.name : productState?.product?.name}</h5>
                  <h6>
                    {productState?.selectedVariation ? convertCurrency(productState?.selectedVariation?.sale_price) : convertCurrency(productState?.product?.sale_price)}
                    {productState?.selectedVariation?.discount ?? productState?.product?.discount ? (
                      <>
                        <del className='text-danger'>{productState?.selectedVariation ? convertCurrency(productState?.selectedVariation?.price) : convertCurrency(productState?.product?.price)}</del>
                        <span>{productState?.selectedVariation ? productState?.selectedVariation?.discount : productState?.product?.discount}% Off</span>
                      </>
                    ) : null}
                  </h6>
                </div>
              </div>
              {/* <ProductAttribute productState={productState} setProductState={setProductState} stickyAddToCart={true} /> */}
              <ProductDetailAction productState={productState} setProductState={setProductState} extraOption={false} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ShowProduct;
