'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/Layout/Loader';
import request from '@/Utils/AxiosUtils';
import { ProductAPI } from '@/Utils/AxiosUtils/API';
import Breadcrumb from '../Common/Breadcrumb';
import Product4Image from './Product4Image';
import RelatedProduct from './Common/RelatedProduct';
import ProductThumbnail from './ProductThumbnail';
import ProductSlider from './ProductSlider';
import ProductSticky from './ProductSticky';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import StickyCheckout from './Common/StickyCheckout';

const ProductDetailContent = ({ type, params }) => {
  const router = useRouter();
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const searchParams = useSearchParams();
  const queryProductLayout = searchParams.get('layout');
  // Getting Product Layout
  const isProductLayout = useMemo(() => {
    return queryProductLayout ? queryProductLayout : themeOption?.product?.product_layout ?? 'product_thumbnail';
  }, [queryProductLayout, themeOption]);

  const [productState, setProductState] = useState({ product: [], attributeValues: [], productQty: 1, selectedVariation: '', variantIds: [] });

  // Calling Product API on slug
  const {
    data: ProductData,
    isLoading,
    refetch,
  } = useQuery([params], () => request({ url: `/${type}/slug/${params}` }, router), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });

  // Calling Product API when params is there
  useEffect(() => {
    params && refetch();
  }, [params]);

  // Setting Product API Data on state Variable and getting ids from cross_sell_products,related_products;
  useEffect(() => {
    if (ProductData) {
      (ProductData?.cross_sell_products?.length > 0 || ProductData?.related_products?.length > 0) &&
        setGetProductIds({ ids: Array.from(new Set([...ProductData?.cross_sell_products, ...ProductData?.related_products])).join(',') });
      setProductState({ ...productState, product: ProductData });
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const button = document.querySelector('.scroll-button');
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        if (buttonRect.bottom < window.innerHeight && buttonRect.bottom < 0) {
          document.body.classList.add('stickyCart');
        } else {
          document.body.classList.remove('stickyCart');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
      document.body.classList?.remove('stickyCart');
    };
  }, []);

  if (isLoading) return <Loader />;

  const showProductLayout = {
    product_thumbnail: <ProductThumbnail productState={productState} setProductState={setProductState} />,
    product_images: <Product4Image productState={productState} setProductState={setProductState} />,
    product_sticky: <ProductSticky productState={productState} setProductState={setProductState} />,
    product_slider: <ProductSlider productState={productState} setProductState={setProductState} />,
    product_accordion: <ProductThumbnail productState={productState} setProductState={setProductState} customTab={true} />,
  };
  return (
    <>
      <Breadcrumb type={type} title={params} subNavigation={[{ name: 'Product' }, { name: params }]} />
      {showProductLayout[isProductLayout]}
      {/* {productState?.product?.related_products?.length > 0 && <RelatedProduct productState={productState} />} */}
      {ProductData && <StickyCheckout ProductData={ProductData} isLoading={isLoading} />}
    </>
  );
};

export default ProductDetailContent;
