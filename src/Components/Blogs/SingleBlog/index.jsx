'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import Sidebar from '../Sidebar/Sidebar';
import BlogCardDetails from '../BlogCardDetails';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import { BlogAPI } from '@/Utils/AxiosUtils/API';

const SingleBlog = ({ params }) => {
  const { data: Blog, isLoading, refetch } = useQuery([params], () => request({ url: `${BlogAPI}/slug/${params}` }), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data });
  return (
    <>
      <Breadcrumb title={Blog?.title} subNavigation={[{ name: 'Blogs', link: '/blogs' }, { name: Blog?.title }]} />
      <WrapperComponent classes={{ sectionClass: 'blog-section section-b-space', row: 'g-4' }} customCol={true}>
        <BlogCardDetails Blog={Blog} key={params}/>
        <Sidebar />
      </WrapperComponent>
    </>
  );
};

export default SingleBlog;
