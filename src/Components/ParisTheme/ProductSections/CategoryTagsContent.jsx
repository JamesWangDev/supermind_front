import React, { useContext } from 'react';
import { categoryTags } from '../../../../Data/CustomData';
import Link from 'next/link';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CategoryTagsContent = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <ul className='value-list'>
      {categoryTags.map((elem) => (
        <li key={elem.id}>
          <div className='category-list'>
            <h5 className='ms-0 text-title'>
              <Link href={elem.path}>{t(elem.title)}</Link>
            </h5>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryTagsContent;
