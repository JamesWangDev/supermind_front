import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Col, Row } from 'reactstrap';
import NoDataFound from '@/Components/Common/NoDataFound';
import Pagination from '@/Components/Common/Pagination';
import ProductBox1 from '@/Components/Common/ProductBox/ProductBox1/ProductBox1';
import request from '@/Utils/AxiosUtils';
import { ProductAPI, SuperpowerAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import noProduct from '../../../../public/assets/svg/no-product.svg';
import ProductSkeletonComponent from '@/Components/Common/SkeletonLoader/ProductSkeleton/ProductSkeletonComponent';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';

const CollectionProducts = ({ filter, grid, paginate }) => {
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const [selectedType] = useCustomSearchParams(['type']);

  const { data, fetchStatus } = useQuery(
    [page, filter, selectedType],
    () =>
      request({
        url: selectedType?.type == "superpower" ? SuperpowerAPI : ProductAPI,
        params: {
          page,
          status: 1,
          paginate: paginate,
          field: filter?.field ?? '',
          price: filter?.price.join(',') ?? '',
          category: filter?.category.join(','),
          sort: '',
          sortBy: filter?.sortBy ?? '',
          rating: filter?.rating.join(',') ?? '',
          attribute: filter?.attribute.join(',') ?? '',
          store_slug: slug ? slug : null,
        },
      }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    },
  );

  return (
    <>
      {fetchStatus == 'fetching' ? (
        <Row xxl={grid !== 3 && grid !== 5 ? 4 : ''} xl={grid == 5 ? 5 : 3} lg={grid == 5 ? 4 : 2} md={3} xs={2} className={`g-sm-4 g-3 product-list-section ${grid == 'list' ? 'list-style' : ''}`}>
          <ProductSkeletonComponent item={40} />
        </Row>
      ) : data?.data?.length > 0 ? (
        <Row xxl={grid !== 3 && grid !== 5 ? 4 : ''} xl={grid == 5 ? 5 : 3} lg={grid == 5 ? 4 : 2} md={3} xs={2} className={`g-sm-4 g-3 product-list-section ${grid == 'list' ? 'list-style' : ''}`}>
          {data?.data?.map((product, i) => (
            <Col key={i}>
              <ProductBox1 imgUrl={product?.product_thumbnail} productDetail={{ ...product }} classObj={{ productBoxClass: 'product-box-3' }} />
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

      {data?.data?.length > 0 && (
        <nav className='custome-pagination'>
          <Pagination current_page={data?.current_page} total={data?.total} per_page={data?.per_page} setPage={setPage} />
        </nav>
      )}
    </>
  );
};

export default CollectionProducts;
