import WrapperComponent from '@/Components/Common/WrapperComponent';
import MainCollection from '../MainCollection';
import LeftCategory from './LeftCategory';

const LayoutSidebar = ({ filter, setFilter }) => {
  return (
    <>
      <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
        <LeftCategory filter={filter} setFilter={setFilter} />
        <MainCollection filter={filter} setFilter={setFilter} />
      </WrapperComponent>
    </>
  );
};

export default LayoutSidebar;
