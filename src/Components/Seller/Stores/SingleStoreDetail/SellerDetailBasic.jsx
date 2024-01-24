import CollectionSidebar from '@/Components/Collection/CollectionSidebar';
import MainCollection from '@/Components/Collection/MainCollection';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import SellerBasicCard from './SellerBasicCard';

const SellerDetailBasic = ({ filter, setFilter, StoreData }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
      <CollectionSidebar filter={filter} setFilter={setFilter} basicStoreCard={<SellerBasicCard StoreData={StoreData} />} sellerClass={'col-xxl-3 col-lg-4'} isAttributes={false} />
      <MainCollection filter={filter} setFilter={setFilter} sellerClass={'col-xxl-9 col-lg-8'}/>
    </WrapperComponent>
  );
};
export default SellerDetailBasic;
