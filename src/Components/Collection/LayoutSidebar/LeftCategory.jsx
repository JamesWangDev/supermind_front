import Image from 'next/image';
import React, { useContext } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { placeHolderImage } from '../../../../Data/CommonPath';
import CategoryContext from '@/Helper/CategoryContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import { useTranslation } from '@/app/i18n/client';
import { usePathname, useRouter } from 'next/navigation';
import NoDataFound from '@/Components/Common/NoDataFound';

const LeftCategory = ({ filter, setFilter }) => {
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const { i18Lang } = useContext(I18NextContext);
  const [layout] = useCustomSearchParams(['layout']);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const pathname = usePathname();
  const redirectToCollection = (slug) => {
    let temp = [...filter?.category];
    if (!temp.includes(slug)) {
      temp.push(slug);
    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        category: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...layout, category: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <div className='col-custome-3'>
      <div className='left-box'>
        <div className='shop-left-sidebar'>
          {categoryData?.length > 0 ? (
            <Nav className='nav-pills mb-3 custom-nav-tab'>
              {categoryData?.map((category, i) => (
                <NavItem onClick={() => redirectToCollection(category?.slug)} key={i}>
                  <NavLink className={filter?.category?.includes(category?.slug) ? 'active' : ''}>
                    {category?.name}
                    {category?.category_icon?.original_url?<img src={category?.category_icon?.original_url} alt={category?.name} height={80} width={80} />:<Image src={placeHolderImage} alt={category?.name} height={80} width={80} />}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          ) : (
            <NoDataFound data={{ customClass: 'bg-light no-data-added', title: 'No Category Found' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftCategory;
