import ProductSection1 from '../ParisTheme/ProductSections/ProductSection1';
import WrapperComponent from '../Common/WrapperComponent';
import { LeafSVG } from '../Common/CommonSVG';

const ProductSection = ({ ProductData, dataAPI }) => {
  return (
    <WrapperComponent noRowCol={true}>
      <ProductSection1 ProductData={ProductData} svgUrl={<LeafSVG className='icon-width' />} dataAPI={data?.content?.products_list_1} />
    </WrapperComponent>
  );
};

export default ProductSection;
