import React, { useContext, useMemo } from 'react';
import Link from 'next/link';
import { Col } from 'reactstrap';
import Avatar from '@/Components/Common/Avatar';
import TodaysDeal from './TodaysDeal';
import Btn from '@/Elements/Buttons/Btn';
import ClassicHeaderMenu from './ClassicHeaderMenu';
import { placeHolderImage } from '../../../../Data/CommonPath';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import CategoryContext from '@/Helper/CategoryContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { RiAlignLeft, RiCloseLine } from 'react-icons/ri';

const HeaderCategory = ({ customClass, icon, dropDownClass }) => {
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { themeOption } = useContext(ThemeOptionContext);
  const filteredCategories = useMemo(() => {
    return categoryData?.filter((elem) => themeOption?.header?.category_ids?.includes(elem.id));
  });
  return (
    <Col xs={12}>
      <div className={`${customClass ? customClass : 'header-nav'}`}>
        <div className='header-nav-left'>
          <Btn className={`dropdown-category ${dropDownClass ?? ''}`}>
            {icon ? icon : <RiAlignLeft />}
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
              {filteredCategories?.length > 0 ? (
                filteredCategories?.map((elem, i) => (
                  <li className='onhover-category-list' key={i}>
                    <Link href={`/${i18Lang}/collections?category=${elem?.slug}`} className='category-name'>
                      <Avatar data={elem?.category_icon} placeHolder={placeHolderImage} name={elem.name} />
                      <h6>{elem?.name}</h6>
                    </Link>
                  </li>
                ))
              ) : (
                <li className='onhover-category-list'>
                  <a className='category-name'>
                    <h6>{'No Category Found'}</h6>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <ClassicHeaderMenu />
        <TodaysDeal />
      </div>
    </Col>
  );
};

export default HeaderCategory;
