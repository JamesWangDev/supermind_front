'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Col } from 'reactstrap';
import Breadcrumb from '../Common/Breadcrumb';
import WrapperComponent from '../Common/WrapperComponent';
import ProductBox1 from '../Common/ProductBox/ProductBox1/ProductBox1';
import { WishlistAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';
import Loader from '@/Layout/Loader';
import NoDataFound from '../Common/NoDataFound';
import emptyImage from '../../../public/assets/svg/empty-items.svg';

const WishlistContent = () => {
  const { data, isLoading, refetch } = useQuery([WishlistAPI], () => request({ url: WishlistAPI }), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    refetch();
  }, []);
  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={'Wishlist'} subNavigation={[{ name: 'Wishlist' }]} />

      {data?.data?.length > 0 ? (
        <WrapperComponent classes={{ sectionClass: 'wishlist-section section-b-space', row: 'g-sm-3 g-2' }} customCol={true}>
          {data?.data?.map((product) => (
            <Col xxl={2} lg={3} md={4} xs={6} className='product-box-contain' key={product.id}>
              <ProductBox1 imgUrl={product?.product_thumbnail} productDetail={product} isClose={true} refetch={refetch} classObj={{ productBoxClass: 'product-box-3' }} />
            </Col>
          ))}
        </WrapperComponent>
      ) : (
        <NoDataFound
          data={{
            customClass: 'no-data-added',
            imageUrl: emptyImage,
            title: 'No Items Added',
            description: 'It appears that nothing has been added to your wishlist. Explore categories if you want to.',
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default WishlistContent;
