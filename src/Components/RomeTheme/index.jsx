'use client';
import { useContext, useEffect } from 'react';
import RomeHomeBanner from './RomeHomeBanner';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import { HomePageAPI } from '@/Utils/AxiosUtils/API';
import ShopCategory from './ShopCategory';
import BestValueBanner from './BestValueBanner';
import FilterProduct from './FilterProduct';
import TwoBanner from './TwoBanner';
import TopSelling from '../TokyoTheme/TopSelling';
import RomeFullBanner from './RomeFullBanner';
import TopProducts from './TopProducts';
import RomeFeatureBlog from './RomeFeatureBlog';
import RomeNewsLetter from './RomeNewsLetter';
import StickyCart from '@/Layout/StickyCart';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import ProductIdsContext from '@/Helper/ProductIdsContext';

const RomeTheme = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { data, isLoading, refetch } = useQuery(['rome'], () => request({ url: HomePageAPI, params: { slug: 'rome' } }), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', '#0baf9a');
    refetch();
    return () => {
      document.documentElement.style.removeProperty('--theme-color');
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
      {<RomeHomeBanner dataAPI={data?.content} />}

      {data?.content?.categories_image_list?.status && <ShopCategory dataAPI={data?.content?.categories_image_list} />}

      {data?.content?.value_banners?.status && data?.content?.value_banners?.banners?.length > 0 && <BestValueBanner dataAPI={data?.content?.value_banners} />}

      {data?.content?.categories_products?.status && <FilterProduct dataAPI={data?.content?.categories_products} />}

      {data?.content?.two_column_banners?.status && <TwoBanner dataAPI={data?.content?.two_column_banners} />}

      {data?.content?.slider_products?.status && <TopSelling dataAPI={data?.content?.slider_products} classes={{ boxClass: 'category-menu' }} />}

      {data?.content?.full_width_banner?.status && <RomeFullBanner dataAPI={data?.content?.full_width_banner} />}

      {data?.content?.products_list_1?.status && <TopProducts dataAPI={data?.content} />}

      {data?.content?.featured_blogs?.status && <RomeFeatureBlog dataAPI={data?.content} />}

      {data?.content?.news_letter?.status && <RomeNewsLetter dataAPI={data?.content?.news_letter} />}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />}
    </>
  );
};

export default RomeTheme;
