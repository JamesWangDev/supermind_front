'use client';
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HomePageAPI } from '@/Utils/AxiosUtils/API';
import BerlinHomeBanner from './BerlinHomeBanner';
import request from '@/Utils/AxiosUtils';
import NewsLetter from '../ParisTheme/NewsLetter';
import BerlinSection from './MainContent/BerlinSection';
import StickyCart from '@/Layout/StickyCart';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import ProductIdsContext from '@/Helper/ProductIdsContext';

const BerlinTheme = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { data, isLoading, refetch } = useQuery(['berlin'], () => request({ url: HomePageAPI, params: { slug: 'berlin' } }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', '#417394');
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
      <BerlinHomeBanner dataAPI={data?.content?.home_banner} />

      <BerlinSection dataAPI={data?.content} />
      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />}
    </>
  );
};

export default BerlinTheme;
