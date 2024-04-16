'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import WrapperComponent from './WrapperComponent';
import { RiHome3Fill } from 'react-icons/ri';

const Breadcrumb = ({type, title, subNavigation }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <WrapperComponent classes={{ sectionClass: 'breadscrumb-section pt-0' }} colProps={{ md: 12 }}>
      {/* <span style={{fontWeight: "bolder", fontSize: 32}}>{type ? (type == "product" ? "SuperMind detail" : "SuperPower detail") : ""}</span> */}
      <div className='breadscrumb-contain'>
        {/* <h2>{t(title)}</h2> */}
        <nav>
          <ol className='breadcrumb mb-0'>
            <li className='breadcrumb-item'>
              <Link href='/'>
                <RiHome3Fill />
              </Link>
            </li>
            {subNavigation?.map((result, i) => (
              <li className='breadcrumb-item active text-capitalize' key={i}>
                {t(result?.name)}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </WrapperComponent>
  );
};

export default Breadcrumb;
