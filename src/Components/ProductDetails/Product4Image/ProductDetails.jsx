import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import ProductBox1Rating from '@/Components/Common/ProductBox/ProductBox1/ProductBox1Rating';
import CustomerOrderCount from '../Common/CustomerOrderCount';
import SettingContext from '@/Helper/SettingContext';
import AddToWishlist from '@/Components/Common/ProductBox/AddToWishlist';
import AddToCompare from '@/Components/Common/ProductBox/AddToCompare';
import SupermindSVG from '../../../../public/assets/svg/product-supermind.svg';
import IconProductStandard from '../../../../public/assets/svg/icon-product-standard.svg';
import IconProductPremium from '../../../../public/assets/svg/icon-product-premium.svg';
import IconProductPlatinum from '../../../../public/assets/svg/icon-product-premium.svg';
import Image from 'next/image';

const ProductDetails = ({ productState, extraOption }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);

  return (
    <>
      {/* <CustomerOrderCount productState={productState} /> */}
      <div className='d-flex justify-content-between align-items-center name'>
        <h2>{productState?.selectedVariation?.name ?? productState?.product?.name}</h2>
        {extraOption !== false ? (
          <div className='wishlist-btn-group'>
            <AddToWishlist productObj={productState?.product} customClass={'wishlist-button btn'} />
            <AddToCompare productObj={productState?.product} customClass={'wishlist-button btn'} />
          </div>
        ) : null}
      </div>
      <div className='price-rating'>
        {/* <div style={{color: "gray"}}> */}
          {/* <div>
            {productState?.product?.participate_type ? "Participate Type: " + productState?.product?.participate_type : ""}
          </div> */}
          {/* <h3 className='theme-color price d-flex align-items-center'> */}
            {/* <Image className='me-2' src={SupermindSVG} />
            {productState?.selectedVariation?.sale_price ? convertCurrency(productState?.selectedVariation?.sale_price) : convertCurrency(productState?.product?.sale_price)}
            <del className='text-content'>{productState?.selectedVariation ? convertCurrency(productState?.selectedVariation?.price) : convertCurrency(productState?.product?.price)}</del> */}
            {/* {productState?.selectedVariation?.discount || productState?.product?.discount ? (
              <del className='text-content'>{productState?.selectedVariation ? convertCurrency(productState?.selectedVariation?.price) : convertCurrency(productState?.product?.price)}</del>
            ) : null} */}
          {/* </h3> */}
        {/* </div> */}
        <div className='product-rating custom-rate'>
          <ProductBox1Rating totalRating={productState?.selectedVariation?.rating_count ?? productState?.product?.rating_count} />
          <span className='review'>
            {productState?.selectedVariation?.reviews_count || productState?.product?.reviews_count || 0} {t('Review')}
          </span>
        </div>
      </div>
      <ProductTypeBadge participate_type={productState.product.participate_type} />
      <div className='mt-2'>
          {productState?.product?.monthly ? "Monthly Subscription Price: " + productState?.product?.monthly : ""}
        </div>
        <div>
          {productState?.product?.max_downstream_cost ? "Max Downstream Cost: " + productState?.product?.max_downstream_cost : ""}
        </div>
        <div>
          {productState?.product?.overage_profit_margin ? "Overage Profit Margin: " + productState?.product?.overage_profit_margin : ""}
      </div>
      <div className='product-contain'>
        <p>{productState?.selectedVariation?.short_description ?? productState?.product?.short_description}</p>
      </div>
    </>
  );
};

const ProductTypeBadge = ({participate_type}) => {
  const getBadgeStyle = (type) => {
    if (type === "standard") return {color: "#FE7A30", backgroundColor: "#3E242D"};
    if (type === "premium") return {color: "#1C152C", backgroundColor: "#FFDF36"};
    if (type === "platinum") return {color: "#476A7B", backgroundColor: "#E7F3F9"};
  }

  const getBadgeIcon = (type) => {
    if (type === "standard") return IconProductStandard;
    if (type === "premium") return IconProductPremium;
    if (type === "platinum") return IconProductPlatinum;
  }

  return (
    <>
      <div style={{...getBadgeStyle(participate_type), borderRadius: 7, width: "130px", height: "40px", padding: "10px 18px", display: "flex", justifyContent: "center", marginTop: 14}}><Image style={{marginRight: 10}} src={getBadgeIcon(participate_type)} />{participate_type ? participate_type.charAt(0).toUpperCase() + participate_type.slice(1) : ""}</div>
    </>
  )
}

export default ProductDetails;
