import { useContext, useState } from 'react';
import NoDataFound from '@/Components/Common/NoDataFound';
import Pagination from '@/Components/Common/Pagination';
import Loader from '@/Layout/Loader';
import request from '@/Utils/AxiosUtils';
import { myproducts } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import AccountHeading from '@/Components/Common/AccountHeading';
import { Col, Row } from 'reactstrap';
import ProductBox1 from '@/Components/Common/ProductBox/ProductBox1/ProductBox1';
import noProduct from '../../../../public/assets/svg/no-product.svg';
import ProductSkeletonComponent from '@/Components/Common/SkeletonLoader/ProductSkeleton/ProductSkeletonComponent';
import { AddToCartAPI } from '@/Utils/AxiosUtils/API';


const MyOrders = () => {
  const [page, setPage] = useState(1);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data, fetchStatus, isLoading, refetch } = useQuery([page, AddToCartAPI], () => request({ url: AddToCartAPI, params: { page: page, paginate: 10 } }), {
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    select: (res) => res?.data,
  });
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title="MyOrders" />
      {fetchStatus == 'fetching' ? (
        <Row xxl={''} xl={3} lg={2} md={3} xs={2} className={`g-sm-4 g-3 product-list-section ${''}`}>
          <ProductSkeletonComponent item={40} />
        </Row>
      ) : data?.items?.length > 0 ? (
        <Row xxl={''} xl={3} lg={2} md={3} xs={2} className={`g-sm-4 g-3 product-list-section ${''}`}>
          {data?.items?.map((product, i) => (
            <Col key={i}>
              <ProductBox1 imgUrl={product?.product?.product_thumbnail} productDetail={{ ...product?.product }} classObj={{ productBoxClass: 'product-box product-box-3' }} />
            </Col>
          ))}
        </Row>
      ) : (
        <NoDataFound
          data={{
            imageUrl: noProduct,
            customClass: 'no-data-added collection-no-data',
            title: "Sorry! Couldn't find the products you were looking For!",
            description: 'Please check if you have misspelt something or try searching with other way.',
            height: 345,
            width: 345,
          }}
        />
      )}

      {data?.items?.length > 0 && (
        <nav className='custome-pagination'>
          <Pagination current_page={data?.current_page} total={data?.total} per_page={data?.per_page} setPage={setPage} />
        </nav>
      )}
    </>
  );
};

export default MyOrders;
