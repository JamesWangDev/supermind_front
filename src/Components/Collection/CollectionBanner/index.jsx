import WrapperComponent from '@/Components/Common/WrapperComponent';
import CollectionSidebar from '../CollectionSidebar';
import MainCollection from '../MainCollection';

const CollectionBanner = ({ filter, setFilter }) => {
  return (
    <>
      <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
        <CollectionSidebar filter={filter} setFilter={setFilter} />
        <MainCollection filter={filter} setFilter={setFilter} isBanner={true} />
      </WrapperComponent>
    </>
  );
};

export default CollectionBanner;
