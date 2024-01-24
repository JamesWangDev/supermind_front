import { Col } from 'reactstrap';
import CategoryMenu from '@/Components/ParisTheme/CategoryMenu';
import OfferBanner from '@/Components/ParisTheme/OfferBanner';
import TrendingProduct from '@/Components/ParisTheme/TrendingProduct';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ProductSection1 from '@/Components/ParisTheme/ProductSections/ProductSection1';
import ProductSection2 from '@/Components/ParisTheme/ProductSections/ProductSection2';
import { categorySliderOption } from '../../../../Data/SliderSettingsData';
import ShowCaseBanner from '@/Components/ParisTheme/ShowCaseBanner';
import { LeafSVG } from '@/Components/Common/CommonSVG';

const MainContent = ({ dataAPI, ProductData }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section', row: 'g-sm-4 g-3' }} customCol={true}>
      <Col xxl={dataAPI?.main_content?.sidebar?.status ? 9 : 12} xl={dataAPI?.main_content?.sidebar?.status ? 8 : 12}>
        {dataAPI?.main_content?.section1_products?.status && (
          <ProductSection1
            dataAPI={dataAPI?.main_content?.section1_products}
            ProductData={ProductData}
            svgUrl={<LeafSVG className='icon-width' />}
            noCustomClass={true}
            classObj={{ productStyle: 'product-classic', productBoxClass: 'product-box-bg' }}
          />
        )}

        {dataAPI?.main_content?.section2_categories_icon_list?.status && (
          <ProductSection2
            isHeadingVisible={true}
            dataAPI={dataAPI?.main_content?.section2_categories_icon_list}
            svgUrl={<LeafSVG className='icon-width' />}
            classes={{ sliderOption: categorySliderOption }}
          />
        )}

        {dataAPI?.main_content?.section3_two_column_banners?.status && <ShowCaseBanner dataAPI={dataAPI?.main_content?.section3_two_column_banners} />}

        {dataAPI?.main_content?.section4_products?.status && (
          <ProductSection1
            dataAPI={dataAPI?.main_content?.section4_products}
            ProductData={ProductData}
            customClass='title'
            svgUrl={<LeafSVG className='icon-width' />}
            classObj={{ productStyle: 'product-classic', productBoxClass: 'product-box-bg' }}
          />
        )}
      </Col>

      {dataAPI?.main_content?.sidebar?.status && (
        <Col xxl={3} xl={4} className='d-none d-xl-block'>
          <div className='p-sticky'>
            {dataAPI?.main_content?.sidebar?.categories_icon_list?.status && <CategoryMenu dataAPI={dataAPI} extraContent={false} />}

            <OfferBanner
              classes={{ customClass: 'ratio_156 section-t-space', customHoverClass: 'home-contain hover-effect' }}
              imgUrl={dataAPI?.main_content?.sidebar?.right_side_banners?.banner_1?.image_url}
              elem={dataAPI?.main_content?.sidebar?.right_side_banners?.banner_1}
              ratioImage={true}
            />

            {dataAPI?.main_content?.sidebar?.sidebar_products?.status && <TrendingProduct dataAPI={dataAPI} />}
          </div>
        </Col>
      )}
    </WrapperComponent>
  );
};

export default MainContent;
