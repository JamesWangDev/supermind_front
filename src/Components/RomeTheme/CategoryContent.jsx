import Image from 'next/image';
import React, { useContext } from 'react';
import { placeHolderImage } from '../../../Data/CommonPath';
import Link from 'next/link';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CategoryContent = ({ elem }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div>
      <div className='shop-category-box border-0'>
        <Link href={`/${i18Lang}/collections?category=${elem?.slug}`} className='circle-1'>
          {
            elem?.category_image?.original_url?<img src={elem?.category_image?.original_url} className='img-fluid' alt={elem?.name} width={106} height={90} />:<Image src={placeHolderImage} className='img-fluid' alt={elem?.name} width={106} height={90} />
          }
        </Link>
        <div className='category-name'>
          <h6>{elem?.name}</h6>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
