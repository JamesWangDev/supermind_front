import React, { useContext, useState } from 'react';
import { Col, UncontrolledAccordion } from 'reactstrap';
import RecentPost from './RecentPost';
import Category from './Category';
import Tags from './Tags';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useSearchParams } from 'next/navigation';
import CategoryContext from '@/Helper/CategoryContext';
import BlogContext from '@/Helper/BlogContext';
import SKBlogSidebar from '@/Components/Common/SkeletonLoader/BlogSkeleton/SKBlogSidebar';

const Sidebar = () => {
  const [open, setOpen] = useState('1');
  const searchParams = useSearchParams();
  const { blogContextLoader } = useContext(BlogContext);
  const { categoryIsLoading } = useContext(CategoryContext);
  const { themeOption } = useContext(ThemeOptionContext);
  const querySidebar = searchParams.get('sidebar');
  const styleObj = {
    no_sidebar: { class: 'd-none' },
    left_sidebar: { class: 'order-lg-1' },
    right_sidebar: { colClass: { xxl: 9, xl: 8, lg: 7 } },
  };
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <Col xxl={3} xl={4} lg={5} className={styleObj[querySidebar ?? themeOption?.blog?.blog_sidebar_type]?.class || ''}>
      <div className='left-sidebar-box'>
        {blogContextLoader || categoryIsLoading ? (
          <SKBlogSidebar />
        ) : (
          <UncontrolledAccordion className='left-accordion-box' open={open} toggle={toggle} defaultOpen={['1', '2', '3']}>
            <RecentPost />
            <Category />
            <Tags />
          </UncontrolledAccordion>
        )}
      </div>
    </Col>
  );
};

export default Sidebar;
