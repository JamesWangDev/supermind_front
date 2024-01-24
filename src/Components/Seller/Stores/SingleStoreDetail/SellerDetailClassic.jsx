import MainCollection from '@/Components/Collection/MainCollection';
import SellerClassicCard from './SellerClassicCard';
import CollectionSidebar from '@/Components/Collection/CollectionSidebar';
import WrapperComponent from '@/Components/Common/WrapperComponent';

const SellerDetailClassic = ({ filter, setFilter, StoreData }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
      <CollectionSidebar filter={filter} setFilter={setFilter} isAttributes={false} />
      <MainCollection filter={filter} setFilter={setFilter} classicStoreCard={<SellerClassicCard StoreData={StoreData} />} />
    </WrapperComponent>
  );
};

export default SellerDetailClassic;
