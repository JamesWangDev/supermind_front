import { useContext } from 'react';
import Link from 'next/link';
import RatioImage from '@/Utils/RatioImage';
import BlogContain from './BlogContain';
import I18NextContext from '@/Helper/I18NextContext';
import { placeHolderImage } from '../../../../Data/CommonPath';
import Image from 'next/image';

const BlogCardContain = ({ blog }) => {
  const { i18Lang } = useContext(I18NextContext);
  return (
    <>
      <div className='blog-image'>
        <Link href={`/${i18Lang}/blogs/${blog.slug}`}>
          {blog?.blog_thumbnail?.original_url ? <img src={blog?.blog_thumbnail?.original_url} alt='blog-image' height={244} width={490} /> : <Image src={placeHolderImage} alt='blog-image' height={244} width={490} />}
        </Link>
      </div>
      <BlogContain blog={blog} />
    </>
  );
};

export default BlogCardContain;
