'use client';
import Breadcrumb from '../Common/Breadcrumb';
import BlogCard from './BlogCard';
import Sidebar from './Sidebar/Sidebar';
import WrapperComponent from '../Common/WrapperComponent';
import { useSearchParams } from 'next/navigation';

const BlogDetail = () => {
  const searchParams = useSearchParams();
  const querySearchCategory = searchParams?.get('category');
  const querySearchTag = searchParams?.get('tag');
  const breadcrumbTitle = querySearchCategory ? `Blogs:${querySearchCategory}` : querySearchTag ? `Blogs:${querySearchTag}` : 'Blogs';
  return (
    <>
      <Breadcrumb title={breadcrumbTitle} subNavigation={[{ name: 'Blog', link: '/blogs' }]} />
      <WrapperComponent classes={{ sectionClass: 'blog-section section-b-space', row: 'g-4' }} customCol={true}>
        <BlogCard />
        <Sidebar />
      </WrapperComponent>
    </>
  );
};

export default BlogDetail;
