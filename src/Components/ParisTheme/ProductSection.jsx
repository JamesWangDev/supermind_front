import { Col } from 'reactstrap';
import CategoryMenu from './CategoryMenu';
import OfferBanner from './OfferBanner';
import TrendingProduct from './TrendingProduct';
import ProductCard from './ProductCard';
import WrapperComponent from '../Common/WrapperComponent';

const ProductSection = ({ dataAPI }) => {
  const bannerOne = dataAPI?.main_content?.sidebar?.left_side_banners?.banner_1?.image_url;
  const bannerTwo = dataAPI?.main_content?.sidebar?.left_side_banners?.banner_2?.image_url;

  return (
    <WrapperComponent classes={{ sectionClass: 'product-section section-t-space', row: 'g-sm-4 g-3' }} customCol={true}>
      {dataAPI?.main_content?.sidebar?.status && (
        <Col xxl={3} xl={4} className='d-none d-xl-block'>
          <div className='p-sticky'>
            <CategoryMenu dataAPI={dataAPI} />

            {dataAPI?.main_content?.sidebar?.left_side_banners?.status && (
              <>
                <OfferBanner classes={{ customClass: 'ratio_156 section-t-space' }} imgUrl={bannerOne} ratioImage={true} elem={dataAPI?.main_content?.sidebar?.left_side_banners?.banner_1} />
                <OfferBanner classes={{ customClass: 'ratio_medium section-t-space' }} imgUrl={bannerTwo} elem={dataAPI?.main_content?.sidebar?.left_side_banners?.banner_2} />
              </>
            )}
            <TrendingProduct dataAPI={dataAPI} />
          </div>
        </Col>
      )}
      <ProductCard dataAPI={dataAPI} />
    </WrapperComponent>
  );
};

export default ProductSection;
