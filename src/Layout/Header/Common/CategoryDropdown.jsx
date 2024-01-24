import React, { useContext } from 'react';
import Btn from '@/Elements/Buttons/Btn';
import CategoryContext from '@/Helper/CategoryContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CategoryDropdown = () => {
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <Btn className='location-button'>
        <select className='form-select locat-name'>
          <option>{t("AllCategory")}</option>
          {categoryData?.map((category, i) => (
            <option key={i}>{category.name}</option>
          ))}
        </select>
      </Btn>
    </>
  );
};

export default CategoryDropdown;
