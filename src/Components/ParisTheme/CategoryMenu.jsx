import React, { useContext } from 'react';
import Avatar from '../Common/Avatar';
import Link from 'next/link';
import { placeHolderImage } from '../../../Data/CommonPath';
import CategoryContext from '@/Helper/CategoryContext';

const CategoryMenu = ({ dataAPI }) => {
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  return (
    <div className='category-menu'>
      <h3>{dataAPI?.main_content?.sidebar?.categories_icon_list?.title}</h3>
      <ul>
        {dataAPI?.main_content?.sidebar?.categories_icon_list?.category_ids?.length > 0 ? (
          categoryData
            ?.filter((el) => dataAPI?.main_content?.sidebar?.categories_icon_list?.category_ids.includes(el.id))
            ?.map((elem) => (
              <li key={elem.id}>
                <div className='category-list'>
                  <Avatar data={elem?.category_icon} placeHolder={placeHolderImage} name={elem?.name} />
                  <h5>
                    <Link href='/'>{elem?.name}</Link>
                  </h5>
                </div>
              </li>
            ))
        ) : (
          <li>
            <div className='category-list'>
              <h5>
                <a>{'No Category Found'}</a>
              </h5>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CategoryMenu;
