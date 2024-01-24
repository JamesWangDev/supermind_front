import { useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import Slider from 'react-slick';
import CustomHeading from '@/Components/Common/CustomHeading';
import ProductBox1 from '@/Components/Common/ProductBox/ProductBox1/ProductBox1';
import { productSliderOption } from '../../../../Data/SliderSettingsData';
import NoDataFound from '@/Components/Common/NoDataFound';

const ProductSection3 = ({ dataAPI, ProductData, svgUrl }) => {
  const filterProduct = useMemo(() => {
    return ProductData.filter((el) => dataAPI?.product_ids?.includes(el.id));
  }, [ProductData, dataAPI]);
  return (
    <>
      <CustomHeading title={dataAPI?.title} svgUrl={svgUrl} subTitle={dataAPI?.description} />
      {filterProduct?.length > 0 ? (
        <div className='product-border overflow-hidden product-slider-bolder'>
          <div className='product-box-slider no-arrow'>
            <Slider {...productSliderOption}>
              {filterProduct.map((elem) => (
                <div key={elem.id}>
                  <Row className='m-0'>
                    <Col xs='12' className='px-0'>
                      <ProductBox1 imgUrl={elem?.product_thumbnail} productDetail={{ ...elem }} />
                    </Col>
                  </Row>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <NoDataFound
          data={{
            customClass: 'bg-light no-data-added',
            title: 'No Product Found',
          }}
        />
      )}
    </>
  );
};

export default ProductSection3;
