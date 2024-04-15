import { useContext } from 'react';
import Link from 'next/link';
import RatioImage from '@/Utils/RatioImage';
import I18NextContext from '@/Helper/I18NextContext';
import ProductIdsContext from '@/Helper/ProductIdsContext';

const OfferBanner = ({ classes = {}, imgUrl, ratioImage, customRatioClass = '', elem, custom, redirectUrl }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { filteredProduct } = useContext(ProductIdsContext);
  const redirectToProduct = (productId) => {
    const product = filteredProduct.find((elem) => elem?.id == productId);
    return 'product/' + product?.slug;
  };
  return (
    <div className={`${classes?.customClass ? classes?.customClass : ''}`}>
      {custom ? 
        <Link href={redirectUrl}>
          <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'}`}>
            {ratioImage ? <RatioImage src={imgUrl} className={`bg-img ${customRatioClass}`} alt='banner' /> : <img src={imgUrl} className={`img-fluid ${customRatioClass}`} alt='banner' />}
          </div>
        </Link> :
      (elem?.redirect_link?.link_type === 'external_url' ? (
        <Link href={elem?.redirect_link?.link || '/'} target='_blank'>
          <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'}`}>
            {ratioImage ? <RatioImage src={imgUrl} className={`bg-img ${customRatioClass}`} alt='banner' /> : <img src={imgUrl} className={`img-fluid ${customRatioClass}`} alt='banner' />}
          </div>
        </Link>
      ) : elem?.redirect_link?.link_type === 'collection' ? (
        <Link href={`/${i18Lang}/collections?category=${elem?.redirect_link?.link || ""}` || '/'}>
          <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'}`}>
            {ratioImage ? <RatioImage src={imgUrl} className={`bg-img ${customRatioClass}`} alt='banner' /> : <img src={imgUrl} className={`img-fluid ${customRatioClass}`} alt='banner' />}
          </div>
        </Link>
      ) : elem?.redirect_link?.link_type === 'product' ? (
        <Link href={`/${i18Lang}/${redirectToProduct(elem?.redirect_link?.link)}` || '/'}>
          <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'}`}>
            {ratioImage ? <RatioImage src={imgUrl} className={`bg-img ${customRatioClass}`} alt='banner' /> : <img src={imgUrl} className={`img-fluid ${customRatioClass}`} alt='banner' />}
          </div>
        </Link>
      ) : (
        <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'}`}>
          {ratioImage ? <RatioImage src={imgUrl} className={`bg-img ${customRatioClass}`} alt='banner' /> : <img src={imgUrl} className={`img-fluid ${customRatioClass}`} alt='banner' />}
        </div>
      ))}
    </div>
  );
};

export default OfferBanner;
