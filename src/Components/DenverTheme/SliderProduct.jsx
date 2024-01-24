import { Col } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import OfferBanner from '../ParisTheme/OfferBanner';
import TopSelling from '../TokyoTheme/TopSelling';

const SliderProduct = ({ dataAPI }) => {
  return (
    <>
      <WrapperComponent classes={{ sectionClass: 'top-selling-section' }} customCol={true}>
        {dataAPI?.left_side_banners?.status && (
          <Col xl={3} lg={4} className='d-lg-block d-none'>
            <OfferBanner
              classes={{ customClass: 'ratio_156', customHoverClass: 'banner-contain hover-effect' }}
              imgUrl={dataAPI?.left_side_banners?.banner_1?.image_url}
              ratioImage={true}
              elem={dataAPI?.left_side_banners?.banner_1}
            />
          </Col>
        )}
        {dataAPI?.slider_products?.status && (
          <Col xxl={!dataAPI?.left_side_banners?.status && 12} xl={dataAPI?.left_side_banners?.status && 9} lg={dataAPI?.left_side_banners?.status ? 8 : 12}>
            <TopSelling dataAPI={dataAPI?.slider_products} classes={{ colClass: { sm: 6, xl: 4 },customClass: 'top-selling-box-section', fluidClass: 'p-0', boxClass: 'category-menu' }} customRow={true} />
          </Col>
        )}
      </WrapperComponent>
    </>
  );
};

export default SliderProduct;
