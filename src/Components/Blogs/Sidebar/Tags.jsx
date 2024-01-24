'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import I18NextContext from '@/Helper/I18NextContext';
import request from '@/Utils/AxiosUtils';
import { TagAPI } from '@/Utils/AxiosUtils/API';
import { useTranslation } from '@/app/i18n/client';
import NoDataFound from '@/Components/Common/NoDataFound';

const Tags = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  // Get Tag Data
  const { data: BlogTagData, isLoading } = useQuery([TagAPI], () => request({ url: TagAPI, params: { type: 'post' } }), {
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) => data.data.data,
  });

  return (
    <AccordionItem>
      <AccordionHeader targetId='3'>{t('ProductTags')}</AccordionHeader>
      <AccordionBody accordionId='3' className='pt-0'>
        <div className='product-tags-box'>
          {BlogTagData?.length > 0 ? (
            <ul>
              {BlogTagData?.map((tags, index) => (
                <li key={index}>
                  <Link href={{ pathname: `/${i18Lang}/blogs`, query: { tag: tags?.slug } }}>{tags.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <NoDataFound data={{ customClass: 'bg-light no-data-added', title: 'No Blog Found' }} />
          )}
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default Tags;
