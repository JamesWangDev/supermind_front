import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import ProductBox1Rating from '@/Components/Common/ProductBox/ProductBox1/ProductBox1Rating';
import CustomerOrderCount from '../Common/CustomerOrderCount';
import SettingContext from '@/Helper/SettingContext';

const ProductDetails = ({ productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  return (
    <>
      <CustomerOrderCount productState={productState} />
      <h2 className='name'>{productState?.selectedVariation?.name ?? productState?.product?.name}</h2>
      <div className='price-rating'>
        <h3 className='theme-color price'>
          {productState?.selectedVariation?.sale_price ? convertCurrency(productState?.selectedVariation?.sale_price) : convertCurrency(productState?.product?.sale_price)}
          <del className='text-content'>{productState?.selectedVariation ? convertCurrency(productState?.selectedVariation?.price) : convertCurrency(productState?.product?.price)}</del>
          {productState?.selectedVariation?.discount || productState?.product?.discount ? (
            <span className='offer-top'>
              {productState?.selectedVariation ? productState?.selectedVariation?.discount : productState?.product?.discount}% {t('Off')}
            </span>
          ) : null}
        </h3>
        <div className='product-rating custom-rate'>
          <ProductBox1Rating totalRating={productState?.selectedVariation?.rating_count ?? productState?.product?.rating_count} />
          <span className='review'>
            {productState?.selectedVariation?.reviews_count || productState?.product?.reviews_count || 0} {t('Review')}
          </span>
        </div>
      </div>
      <div className='product-contain'>
        <p>{productState?.selectedVariation?.short_description ?? productState?.product?.short_description}</p>
      </div>
    </>
  );
};

export default ProductDetails;
