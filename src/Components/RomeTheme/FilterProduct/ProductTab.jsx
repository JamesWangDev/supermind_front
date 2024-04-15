import { useQuery } from '@tanstack/react-query';
import { Row, TabContent, TabPane } from 'reactstrap';
import request from '@/Utils/AxiosUtils';
import { ProductAPI } from '@/Utils/AxiosUtils/API';
import ProductSection1 from '@/Components/ParisTheme/ProductSections/ProductSection1';

const ProductTab = ({ activeTab }) => {
  const { data: ProductData, refetch } = useQuery([activeTab], () => request({ url: ProductAPI, params: { category_ids: activeTab, status: 1 } }), {
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });
  return (
    <TabContent>
      <TabPane>
        {ProductData?.length > 0 ? (
          <Row className='g-8'>
            <ProductSection1 ProductData={ProductData} classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }} isHeadingVisible={false} />
          </Row>
        ) : (
          <ProductSection1 ProductData={ProductData} classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }} isHeadingVisible={false} />
        )}
      </TabPane>
    </TabContent>
  );
};

export default ProductTab;
