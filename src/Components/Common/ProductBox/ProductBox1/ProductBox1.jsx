import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { RiCloseLine } from 'react-icons/ri';
import ProductBoxAction from './ProductBox1Action';
import ProductBox1Cart from './ProductBox1Cart';
import ProductBox1Rating from './ProductBox1Rating';
import Avatar from '../../Avatar';
import { placeHolderImage } from '../../../../../Data/CommonPath';
import Btn from '@/Elements/Buttons/Btn';
import useDelete from '@/Utils/Hooks/useDelete';
import { WishlistAPI } from '@/Utils/AxiosUtils/API';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import ProductBagde from './ProductBagde';
import SettingContext from '@/Helper/SettingContext';
import { ModifyString } from '@/Utils/CustomFunctions/ModifyString';

const ProductBox1 = ({ imgUrl, badge, productDetail, isClose, refetch, addAction = true, classObj }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  const { data: wishlistData, mutate, isLoading: wishlistLoader } = useDelete(WishlistAPI, `/${i18Lang}/wishlist`);
  const handelDelete = (currObj) => {
    mutate(currObj?.id);
  };
  useEffect(() => {
    if (wishlistData?.status == 200 || wishlistData?.status == 201) {
      refetch();
    }
  }, [wishlistLoader]);
  return (
    <div className={`product-box ${classObj?.productBoxClass}`}>
      <ProductBagde productDetail={productDetail} />
      {isClose && (
        <div className='product-header-top' onClick={() => handelDelete(productDetail)}>
          <Btn className='wishlist-button close_button'>
            <RiCloseLine />
          </Btn>
        </div>
      )}
      <div className='product-image'>
        <Link href={`/${i18Lang}/${productDetail?.type === "superpower" ? 'superpower' : 'product'}/${productDetail?.slug}`}>
          <Avatar data={imgUrl} placeHolder={placeHolderImage} customeClass={'img-fluid'} name={productDetail.title} height={500} width={500} />
        </Link>
        {/* <ProductBoxAction productObj={productDetail} listClass="product-option" /> */}
      </div>
      <div className='product-detail'>
        <Link href={`/${i18Lang}/${productDetail?.type === "superpower" ? 'superpower' : 'product'}/${productDetail?.slug}`}>
          <h6 className='name'>{productDetail.name}</h6>
          <p className='text-title' dangerouslySetInnerHTML={{ __html: productDetail?.short_description }} />
        </Link>
        {productDetail?.unit && <h6 className='unit mt-1'>{productDetail?.unit}</h6>}
        {/* <h5 className='sold text-content'>
          <span className='theme-color price'>{convertCurrency(productDetail?.sale_price)}</span>
          <del>{convertCurrency(productDetail?.price)}</del>
        </h5> */}

        <div className='product-rating mt-sm-2 mt-1'>
          <ProductBox1Rating totalRating={productDetail?.rating_count || 0} />
          {/* <h6 className='theme-color'>{ModifyString(productDetail.stock_status, false, '_')}</h6> */}
        </div>
        {addAction && <ProductBox1Cart productObj={productDetail} />}
      </div>
    </div>
  );
};

export default ProductBox1;
