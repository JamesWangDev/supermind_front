import React, { useContext } from 'react';
import Link from 'next/link';
import WrapperComponent from '../Common/WrapperComponent';
import I18NextContext from '@/Helper/I18NextContext';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import Image from 'next/image';

const GiftBanner = ({ dataAPI }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { filteredProduct } = useContext(ProductIdsContext);
  const redirectToProduct = (productId) => {
    const product = filteredProduct.find((elem) => elem?.id == productId);
    return 'product/' + product?.slug;
  };

  return (
    <WrapperComponent classes={{ sectionClass: 'offer-section sale-banner' }} colProps={{ xs: 12 }}>
      {dataAPI?.redirect_link?.link_type === 'external_url' ? (
        <Link href={dataAPI?.redirect_link?.link || '/'} target='_blank'>
          <div className='hover-effect p-0' >
            <Image src={dataAPI?.image_url} className='w-100 ' height={134.44} width={1567.41} alt="gift"/>
          </div>
        </Link>
      ) : dataAPI?.redirect_link?.link_type === 'collection' ? (
        <Link href={`/${i18Lang}/collections?category=${dataAPI?.redirect_link?.link}` || '/'}>
          <div className='hover-effect p-0' >
            <Image src={dataAPI?.image_url} className='w-100 ' height={134.44} width={1567.41} alt="gift"/>
          </div>
        </Link>
      ) : dataAPI?.redirect_link?.link_type === 'product' ? (
        <Link href={`/${i18Lang}/${redirectToProduct(dataAPI?.redirect_link?.link)}` || '/'}>
          <div className='hover-effect p-0' >
            <Image src={dataAPI?.image_url} className='w-100 ' height={134.44} width={1567.41} alt="gift"/>
          </div>
        </Link>
      ) : (
        <div className='hover-effect p-0' >
          <Image src={dataAPI?.image_url} className='w-100 ' height={134.44} width={1567.41} alt="gift"/>
        </div>
      )}
    </WrapperComponent>
  );
};

export default GiftBanner;
