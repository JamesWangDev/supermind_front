'use client';
import React, { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import TopBanner from './TopBanner';
import HomeBanner from './HomeBanner';
import ProductSection from './ProductSection';
import { HomePageAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';
import NewsLetter from './NewsLetter';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import StickyCart from '@/Layout/StickyCart';
import ProductIdsContext from '@/Helper/ProductIdsContext';

const ParisTheme = () => {
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { themeOption } = useContext(ThemeOptionContext);
  const { data, isLoading, refetch } = useQuery(['paris'], () => request({ url: HomePageAPI, params: { slug: 'paris' } }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
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
  if (!data?.content) return null;
  return (
    <>
      <TopBanner dataAPI={data?.content} />

      {data?.content?.featured_banners?.status && <HomeBanner bannersData={data?.content?.featured_banners?.banners} />}

      <ProductSection dataAPI={data?.content} />

      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />}
    </>
  );
};

export default ParisTheme;
