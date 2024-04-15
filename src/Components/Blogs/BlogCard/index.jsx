import React, { useContext, useEffect, useState } from 'react';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { Col, Row } from 'reactstrap';
import BlogCardContain from './BlogCard';
import { useQuery } from '@tanstack/react-query';
import { BlogAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';
import Pagination from '@/Components/Common/Pagination';
import { useSearchParams } from 'next/navigation';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import BlogSkeletonComponent from './BlogSkeletonComponent';
import emptyImage from '../../../../public/assets/svg/empty-items.svg';
import NoDataFound from '@/Components/Common/NoDataFound';

const BlogCard = () => {
  const [page, setPage] = useState(1);
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const searchParams = useSearchParams();
  const querySearchCategory = searchParams?.get('category');
  const querySearchTag = searchParams?.get('tag');
  const queryBoxStyle = searchParams?.get('style');
  const querySidebar = searchParams?.get('sidebar');
  const styleObj = {
    no_sidebar: { colClass: { xxl: 12, xl: 12, lg: 12 } },
    left_sidebar: { class: 'order-lg-2', colClass: { xxl: 9, xl: 8, lg: 7 } },
    right_sidebar: { colClass: { xxl: 9, xl: 8, lg: 7 } },
    list_view: { class: 'blog-list', colClass: { xs: 12 } },
    grid_view: { colClass: { xxl: 4, sm: 6 } },
  };
  const {
    data: BlogData,
    isLoading,
    refetch,
  } = useQuery([BlogAPI, querySearchCategory, querySearchTag], () => request({ url: BlogAPI, params: { page, category: querySearchCategory ?? '', tag: querySearchTag ?? '' } }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
  }, [page, querySearchCategory, querySearchTag]);
  return (
    <>
      <Col {...styleObj[querySidebar ?? themeOption?.blog?.blog_sidebar_type]?.colClass} className={styleObj[querySidebar ?? themeOption?.blog?.blog_sidebar_type]?.class || ''}>
        {isLoading ? (
          <BlogSkeletonComponent queryBoxStyle={queryBoxStyle} />
        ) : (
          <Row className={`g-4 `}>
            {BlogData?.data?.length > 0 ? (
              BlogData?.data?.map((blog, i) => (
                <Col {...styleObj[queryBoxStyle ?? themeOption?.blog?.blog_style].colClass} key={i}>
                  <div className={`blog-box ${blog?.is_sticky === 1 ? 'sticky-blog-box' : ''} ${styleObj[queryBoxStyle ?? themeOption?.blog?.blog_style]?.class}`}>
                    {blog?.is_featured ? (
                      <div className='blog-label-tag'>
                        <span>{t('Featured')}</span>
                      </div>
                    ) : null}
                    <BlogCardContain blog={blog} />
                  </div>
                </Col>
              ))
            ) : (
              <NoDataFound
                data={{
                  customClass: 'no-data-added',
                  imageUrl: emptyImage,
                  title: 'No Blogs Found',
                  description: 'Oops! It seems that we could not find any blogs matching your search criteria.',
                  height: 400,
                  width: 400,
                }}
              />
            )}
          </Row>
        )}
        {BlogData?.data.length > 0 && (
          <nav className='custome-pagination'>
            <Pagination current_page={BlogData?.current_page} total={BlogData?.total} per_page={BlogData?.per_page} setPage={setPage} />
          </nav>
        )}
      </Col>
    </>
  );
};

export default BlogCard;
