import Avatar from '@/Components/Common/Avatar';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { placeHolderImage } from '../../../../Data/CommonPath';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import SettingContext from '@/Helper/SettingContext';
import SelectBundleProduct from './SelectBundleProduct';

const ProductBundle = ({ productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { convertCurrency } = useContext(SettingContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { filteredProduct } = useContext(ProductIdsContext);
  const [crossSellProduct, setCrossSellProduct] = useState([]);
  useEffect(() => {
    productState?.product?.cross_sell_products && setCrossSellProduct(filteredProduct.filter((elem) => productState?.product?.cross_sell_products?.includes(elem?.id)));
  }, [productState, filteredProduct]);
  return (
    <div className='related-product bundle-sec'>
      <div className='product-title-2'>
        <h4>{t("FrequentlyBoughtTogether")}</h4>
      </div>
      <div className='related-box'>
        <div className='related-image'>
          <ul>
            {crossSellProduct.map((elem, i) => (
              <li key={i}>
                <div className='product-box product-box-bg'>
                  <div className='product-image'>
                    <Link href={`/${i18Lang}/product/${elem?.slug}`}>
                      <Avatar data={elem?.product_thumbnail} name={elem?.name} placeHolder={placeHolderImage} height={150} width={150} />
                    </Link>
                  </div>
                  <div className='product-detail'>
                    <Link href={`/${i18Lang}/product/${elem?.slug}`}>
                      <h6 className='name'>{elem?.name}</h6>
                    </Link>
                    <h5 className='sold text-content'>
                      <span className='theme-color price'>{convertCurrency(elem?.sale_price)}</span>
                      <del>{convertCurrency(elem?.price)}</del>
                    </h5>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <SelectBundleProduct crossSellProduct={crossSellProduct} />
      </div>
    </div>
  );
};

export default ProductBundle;
