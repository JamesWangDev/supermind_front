import CollectionSlider from './CollectionSlider';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import CollectionSidebar from '../CollectionSidebar';
import MainCollection from '../MainCollection';

const MainCollectionSlider = ({ filter, setFilter }) => {
  return (
    <>
      <CollectionSlider filter={filter} setFilter={setFilter} />
      <WrapperComponent classes={{ sectionClass: 'section-b-space section-t-space shop-section' }} customCol={true}>
        <CollectionSidebar filter={filter} setFilter={setFilter} />
        <MainCollection filter={filter} setFilter={setFilter} />
      </WrapperComponent>
    </>
  );
};

export default MainCollectionSlider;
