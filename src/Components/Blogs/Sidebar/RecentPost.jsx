'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import Avatar from '@/Components/Common/Avatar';
import { formatDateForDateRange } from '@/Utils/CustomFunctions/DateFormate';
import { placeHolderImage } from '../../../../Data/CommonPath';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import BlogContext from '@/Helper/BlogContext';
import NoDataFound from '@/Components/Common/NoDataFound';

const RecentPost = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { blogState } = useContext(BlogContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <AccordionItem>
      <AccordionHeader targetId='1'>{t('RecentPost')}</AccordionHeader>
      <AccordionBody accordionId='1' className='pt-0'>
        {blogState?.length > 0 ? (
          <div className='recent-post-box'>
            {blogState?.slice(0, 5).map((blog, index) => (
              <div className='recent-box' key={index}>
                <Link href={`/${i18Lang}/blogs/${blog?.slug}`} className='recent-image'>
                  <Avatar data={blog?.blog_thumbnail} placeHolder={placeHolderImage} name={blog?.blog_thumbnail?.name} width={124} height={124} />
                </Link>

                <div className='recent-detail'>
                  <Link href={`/${i18Lang}/blogs/${blog?.slug}`}>
                    <h5 className='recent-name'>{blog.title}</h5>
                  </Link>
                  <h6>{formatDateForDateRange(blog.created_at)}</h6>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound data={{ customClass: 'bg-second border-30 no-data-added', title: 'No Blog Found' }} />
        )}
      </AccordionBody>
    </AccordionItem>
  );
};

export default RecentPost;
