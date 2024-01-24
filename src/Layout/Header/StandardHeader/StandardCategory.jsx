import React, { useContext, useMemo } from 'react';
import MainHeaderMenu from '../Common/MainHeaderMenu';
import Btn from '@/Elements/Buttons/Btn';
import CategoryContext from '@/Helper/CategoryContext';
import { FiAlignLeft } from 'react-icons/fi';
import { useTranslation } from '@/app/i18n/client';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import I18NextContext from '@/Helper/I18NextContext';
import Link from 'next/link';
import Avatar from '@/Components/Common/Avatar';
import { placeHolderImage } from '../../../../Data/CommonPath';
import StandardHotDeal from './StandardHotDeal';
import { RiCloseLine } from 'react-icons/ri';

const StandardCategory = () => {
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { themeOption, mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);
  const filteredCategories = useMemo(() => {
    return categoryData?.filter((elem) => themeOption?.header?.category_ids?.includes(elem.id));
  });
  return (
    <div className='main-nav'>
      <div className='header-nav-left'>
        <Btn className={`dropdown-category dropdown-category-2`}>
          <FiAlignLeft />
          <span>{t('AllCategories')}</span>
        </Btn>
        <div className='category-dropdown'>
          <div className='category-title'>
            <h5>{t('Categories')}</h5>
            <Btn type='button' className='p-0 close-button text-content'>
              <RiCloseLine />
            </Btn>
          </div>

          <ul className='category-list'>
            {filteredCategories?.map((elem, i) => (
              <li className='onhover-category-list' key={i}>
                <Link href={`/${i18Lang}/collections?category=${elem?.slug}`} className='category-name'>
                  <Avatar data={elem?.category_icon} placeHolder={placeHolderImage} name={elem.name} />
                  <h6>{elem?.name}</h6>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='main-nav navbar navbar-expand-xl navbar-light navbar-sticky'>
        <div className={`offcanvas offcanvas-collapse order-xl-2 ${mobileSideBar ? "show" : ""} `} id='primaryMenu'>
          <div className='offcanvas-header navbar-shadow'>
            <h5>{t('Menu')}</h5>
            <Btn className='btn-close lead' type='button' onClick={() => setMobileSideBar(!mobileSideBar)}>
              <RiCloseLine />
            </Btn>
          </div>
          <div className='offcanvas-body'>
            <MainHeaderMenu />
          </div>
        </div>
        {mobileSideBar && <div className={"offcanvas-backdrop fade show"} onClick={() => setMobileSideBar(!mobileSideBar)} />}
      </div>
      <StandardHotDeal />
    </div>
  );
};

export default StandardCategory;
