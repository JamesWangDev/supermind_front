import { useEffect, useState } from 'react';
import BlogContext from '.';
import { useQuery } from '@tanstack/react-query';
import { BlogAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';

const BlogProvider = (props) => {
  const [blogState, setBlogState] = useState([]);
  const [blogParams, setBlogParams] = useState('');

  const { data: BlogData, isLoading, refetch } = useQuery([BlogAPI], () => request({ url: BlogAPI }), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data });

  useEffect(() => {
    BlogData && setBlogState(BlogData);
  }, [isLoading]);

  const handleSetQueryParams = (value) => {
    setBlogParams(value);
  };

  return (
    <>
      <BlogContext.Provider value={{ handleSetQueryParams, blogParams, blogState, setBlogParams, blogContextLoader: isLoading, ...props }}>{props.children}</BlogContext.Provider>
    </>
  );
};

export default BlogProvider;
