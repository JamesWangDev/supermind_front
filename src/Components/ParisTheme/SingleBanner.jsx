import I18NextContext from '@/Helper/I18NextContext';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

const SingleBanner = ({ classes = {}, image_url, height, width, dataAPI }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { filteredProduct } = useContext(ProductIdsContext);
  const redirectToProduct = (productId) => {
    const product = filteredProduct.find((elem) => elem?.id == productId);
    return 'product/' + product?.slug;
  };
  return (
    <div className={classes?.sectionClass ? classes?.sectionClass : ''}>
      <div className='banner-contain'>
        {dataAPI?.redirect_link?.link_type === 'external_url' ? (
          <Link href={dataAPI?.redirect_link?.link || '/'} target='_blank'>
            <img src={image_url} className='img-fluid' alt='Banner' height={height} width={width} />
          </Link>
        ) : dataAPI?.redirect_link?.link_type === 'collection' ? (
          <Link href={`/${i18Lang}/collections?category=${dataAPI?.redirect_link?.link}` || '/'}>
            <img src={image_url} className='img-fluid w-100' alt='Banner' height={height} width={width} />
          </Link>
        ) : dataAPI?.redirect_link?.link_type === 'product' ? (
          <Link href={`/${i18Lang}/${redirectToProduct(dataAPI?.redirect_link?.link)}` || '/'}>
            <img src={image_url} className='img-fluid' alt='Banner' height={height} width={width} />
          </Link>
        ) : (
          <Image src={image_url} className='img-fluid' alt='Banner' height={height} width={width} />
        )}
      </div>
    </div>
  );
};

export default SingleBanner;
