'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import request from '@/Utils/AxiosUtils';
import { StoreAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import ClassicStoreCard from './ClassicStoreCard';
import StoreCard from './StoreCard';

const SellerStoreContent = () => {
  const searchParams = useSearchParams();
  const querySellerLayout = searchParams.get('layout');
  const { themeOption } = useContext(ThemeOptionContext);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery([page], () => request({ url: StoreAPI, params: { status: 1,page:page,paginate: 9 } }), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data });

  const isSellerLayout = querySellerLayout ? querySellerLayout : themeOption?.seller?.store_layout;
  return (
    <>
      <Breadcrumb title={'Seller'} subNavigation={[{ name: 'Seller' }]} />
      <WrapperComponent classes={{ sectionClass: 'seller-grid-section section-b-space', row: 'g-4' }} customCol={true}>
        {isSellerLayout == 'basic_store' ? <StoreCard data={data} isLoading={isLoading} setPage={setPage}  /> : <ClassicStoreCard data={data} isLoading={isLoading} setPage={setPage}/>}
      </WrapperComponent>
    </>
  );
};

export default SellerStoreContent;
