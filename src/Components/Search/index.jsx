'use client';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import Breadcrumb from '../Common/Breadcrumb';
import { LeafSVG } from '../Common/CommonSVG';
import { Input, InputGroup } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import Btn from '@/Elements/Buttons/Btn';
import { ProductAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';
import Loader from '@/Layout/Loader';
import { useRouter } from 'next/navigation';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SearchedData from './SearchedData';

const SearchModule = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [search] = useCustomSearchParams(['search']);
  const [searchState, setSearchState] = useState('');
  const router = useRouter();
  const { data, refetch, isLoading } = useQuery([ProductAPI,"search"], () => request({ url: ProductAPI, params: { search: search?.search ?? searchState, paginate: 12, status: 1 } }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  useEffect(() => {
    refetch();
    setSearchState(search?.search);
  }, [search]);
  useEffect(() => {
    searchState && refetch();
  }, []);
  const onHandleSearch = () => {
    refetch();
    router.push(`/${i18Lang}/search?search=${searchState}`);
  };
  if (isLoading) return <Loader />;
  const onChangeHandler = (value) => {
    if (!value) {
      router.push(`/${i18Lang}/search?search=`);
    }
    setSearchState(value);
  };
  return (
    <>
      <Breadcrumb title={'Search'} subNavigation={[{ name: 'Search' }]} />
      <WrapperComponent classes={{ sectionClass: 'search-section', col: 'mx-auto' }} colProps={{ xxl: 6, xl: 8 }}>
        <div className='title d-block text-center'>
          <h2>{t('Searchforproducts')}</h2>
          <span className='title-leaf'>
            {/* <LeafSVG /> */}
          </span>
        </div>

        <div className='search-box'>
          <InputGroup>
            <Input type='text' placeholder='Search' className='form-control' value={searchState} onChange={(e) => onChangeHandler(e.target.value)} />
            <Btn className='theme-bg-color text-white m-0' type='button' title='Search' onClick={onHandleSearch} />
          </InputGroup>
        </div>
      </WrapperComponent>
      <SearchedData data={data} />
    </>
  );
};

export default SearchModule;
