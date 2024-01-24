import { useContext, useMemo, useState } from 'react';
import MenuList from './MenuList';
import { headerMenu } from '../../../../Data/HeadersMenu';
import ProductContext from '@/Helper/ProductContext';
import ProductIdsContext from '@/Helper/ProductIdsContext';

const MainHeaderMenu = () => {
  const [isOpen, setIsOpen] = useState([]);
  const { filteredProduct } = useContext(ProductIdsContext);
  const { productAPIData } = useContext(ProductContext);
  const filterMenu = useMemo(() => {
    return headerMenu.filter((menu) => {
      return filteredProduct?.length > 0 || productAPIData?.data?.length > 0 ? menu : menu.title !== 'Product';
    });
  }, [filteredProduct, productAPIData?.data]);
  return (
    <ul className='navbar-nav'>
      {filterMenu.map((menu, i) => (
        <MenuList menu={menu} key={i} customClass={'nav-item dropdown'} level={0} isOpen={isOpen} setIsOpen={setIsOpen} />
      ))}
    </ul>
  );
};

export default MainHeaderMenu;
