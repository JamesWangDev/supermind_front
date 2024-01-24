import React, { Fragment, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Col, Row } from 'reactstrap';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import MenuSlider from './MenuSlider';

const MenuList = ({ menu, customClass, anchorClass, isOpen, setIsOpen, level }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <li className={`${customClass ? customClass : ''} ${menu?.badge ? 'new-nav-item' : ''} ${menu.children ? 'dropdown-mega' : ''}`}>
        {menu?.path ? (
          <Link className={`${anchorClass ? anchorClass : 'nav-link dropdown-toggle'}`} href={{ pathname: `/${i18Lang}${menu?.path}`, query: menu?.params }}>
            {t(menu?.title)}
          </Link>
        ) : (
          <>
            <a
              className={`${anchorClass ? anchorClass : 'nav-link dropdown-toggle'}`}
              onClick={() => {
                const temp = isOpen.slice();
                temp[level] = menu.title !== temp[level] && menu.title;
                setIsOpen(temp);
              }}>
              {t(menu?.title)}
              {menu?.badge && <label className='new-dropdown'>{menu?.badge}</label>}
            </a>
          </>
        )}

        {menu?.styleType == 'image' && (
          <div className={`dropdown-menu dropdown-menu-2 dropdown-image ${!isOpen.length ? 'show' : isOpen[level] === menu.title ? 'show' : ''}`}>
            <div className='dropdown-column'>
              {menu?.children?.map((data, i) => (
                <Link className={'dropdown-item'} href={{ pathname: `/${i18Lang}${data?.path}`, query: data?.params }} key={i}>
                  <Image src={data.image} className='img-fluid' alt={data.image} height={500} width={500} />
                  <span>{t(data?.title)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {menu?.styleType == 'link' && (
          <div className={`dropdown-menu dropdown-menu-2 ${isOpen[level] === menu.title ? 'show' : ''}`}>
            <Row>
              <>
                {menu?.children?.map((elem, i) => (
                  <Col xl={3} className='dropdown-column' key={i}>
                    {elem?.column?.map((head, i) => (
                      <Fragment key={i}>
                        {head?.type == 'sub' ? (
                          <h5 className={`dropdown-header ${head?.colHeadClass ?? ''}`}>{t(head?.title)}</h5>
                        ) : head?.type == 'external_link' ? (
                          <Link className={'dropdown-item'} href={head?.path} target='_blank'>
                            {t(head?.title)}
                            {head?.label && <label className={`menu-label ${head?.labelClass ?? ''}`}>{head?.label}</label>}
                          </Link>
                        ) : (
                          <Link className={'dropdown-item'} href={{ pathname: `/${i18Lang}/${head?.path}`, query: head?.params }}>
                            {t(head?.title)}
                            {head?.label && <label className={`menu-label ${head?.labelClass ?? ''}`}>{head?.label}</label>}
                          </Link>
                        )}
                      </Fragment>
                    ))}
                  </Col>
                ))}
              </>
              <MenuSlider menu={menu} />
            </Row>
          </div>
        )}
        {menu?.children && !menu?.customChildren && (
          <ul className={`dropdown-menu ${isOpen[level] === menu.title ? 'show' : ''}`}>
            {menu.children && (
              <>
                {menu.children.map((childMenu, i) => (
                  <MenuList menu={childMenu} key={i} anchorClass={'dropdown-item'} level={level + 1} setIsOpen={setIsOpen} isOpen={isOpen} />
                ))}
              </>
            )}
          </ul>
        )}
      </li>
    </>
  );
};

export default MenuList;
