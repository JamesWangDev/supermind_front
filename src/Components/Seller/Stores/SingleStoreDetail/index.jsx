'use client';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import { StoreAPI } from '@/Utils/AxiosUtils/API';
import SellerDetailBasic from './SellerDetailBasic';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import SellerDetailClassic from './SellerDetailClassic';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import { useSearchParams } from 'next/navigation';
import { ModifyString } from '@/Utils/CustomFunctions/ModifyString';

const SingleStoreDetail = ({ params }) => {
  const { data: StoreData, isLoading, refetch } = useQuery([params], () => request({ url: `${StoreAPI}/slug/${params}` }), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    params && refetch();
  }, [params]);

  const [filter, setFilter] = useState({ category: [], price: [], attribute: [], rating: [], sortBy: '', field: '' });
  const { themeOption } = useContext(ThemeOptionContext);
  const [category, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(['category', 'attribute', 'price', 'rating', 'sortBy', 'field', 'layout']);
  const sellerDetailLayout = layout?.layout ? layout?.layout : themeOption?.collection?.collection_layout;
  
  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        category: category ? category?.category?.split(',') : [],
        attribute: attribute ? attribute?.attribute?.split(',') : [],
        price: price ? price?.price?.split(',') : [],
        rating: rating ? rating?.rating?.split(',') : [],
        sortBy: sortBy ? sortBy?.sortBy : '',
        field: field ? field?.field : '',
      };
    });
  }, [category, attribute, price, rating, sortBy, field]);
  const storeName =ModifyString(params,false,"-")

  return (
    <>
      <Breadcrumb title={storeName} subNavigation={[{ name: 'SellerStores' },{ name:storeName  }]} />
      {sellerDetailLayout == 'basic_store_details' ? (
        <SellerDetailBasic filter={filter} setFilter={setFilter} StoreData={StoreData} />
      ) : sellerDetailLayout == 'classic_store_details' ? (
        <SellerDetailClassic filter={filter} setFilter={setFilter} StoreData={StoreData} />
      ) : (
        <SellerDetailBasic filter={filter} setFilter={setFilter} StoreData={StoreData} />
      )}
    </>
  );
};
export default SingleStoreDetail;
