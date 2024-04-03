'use client';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import StickyCart from '@/Layout/StickyCart';
import request from '@/Utils/AxiosUtils';
import { HomePageAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import FeatureBanner from '../ParisTheme/HomeBanner';
import NewsLetter from '../ParisTheme/NewsLetter';
import CategoryMenu from './CategoryMenu';
import HomeBanner from './HomeBanner';
import OfferBanner from './OfferBanner';
import ProductCard from './ProductCard';
import TopSelling from './TopSelling';

const TokyoTheme = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { data, isLoading, refetch } = useQuery(['tokyo'], () => request({ url: HomePageAPI, params: { slug: 'tokyo' } }), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    const headerTops = document.getElementsByClassName('header-top');

    document.documentElement.style.setProperty('--theme-color', '#d99f46');
    let timer = setTimeout(() => {
      for (const headerTop of headerTops) {
        headerTop.classList.add('bg-dark');
      }
    }, 0);

    refetch();

    return () => {
      document.documentElement.style.removeProperty('--theme-color');
      for (const headerTop of headerTops) {
        headerTop.classList.remove('bg-dark');
      }
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('skeleton-body');
    } else {
      document.body.classList.remove('skeleton-body');
    }

    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(',') });
    }
  }, [isLoading]);
  return (
    <>
      <HomeBanner dataAPI={data?.content?.home_banner} />

      {data?.content?.categories_icon_list?.status && <CategoryMenu dataAPI={data?.content?.categories_icon_list} />}

      {data?.content?.coupons?.status && <OfferBanner dataAPI={data?.content?.coupons} height={138} width={1585} classes={{ fluidClass: 'sale-banner' }}/>}

      {data?.content?.featured_banners?.status && data?.content?.featured_banners?.banners?.length > 0 && <FeatureBanner bannersData={data?.content?.featured_banners?.banners} />}

      <ProductCard dataAPI={data?.content} />

      {data?.content?.full_width_banner?.status && <OfferBanner dataAPI={data?.content?.full_width_banner} height={343} width={1524} />}

      {data?.content?.slider_products?.status && <TopSelling dataAPI={data?.content?.slider_products} classes={{ colClass: { sm: 6, xl: 4, xxl: 3 } }} />}

      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />}
    </>
  );
};

export default TokyoTheme;