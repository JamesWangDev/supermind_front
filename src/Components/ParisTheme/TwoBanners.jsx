import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import Image from 'next/image';
import Link from 'next/link';
import I18NextContext from '@/Helper/I18NextContext';
import ProductIdsContext from '@/Helper/ProductIdsContext';

const TwoBanners = ({ dataAPI }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { filteredProduct } = useContext(ProductIdsContext);
  const redirectToProduct = (productId) => {
    const product = filteredProduct.find((elem) => elem?.id == productId);
    return 'product/' + product?.slug;
  };
  return (
    <div>
      <Row className='g-md-3 g-3'>
        <Col xxl={8} xl={12} md={7}>
          {dataAPI?.main_content?.section6_two_column_banners?.banner_1?.redirect_link?.link_type === 'external_url' ? (
            <Link href={dataAPI?.main_content?.section6_two_column_banners?.banner_1?.redirect_link?.link || '/'} target='_blank'>
              <div className='banner-contain hover-effect'>
                <img src={dataAPI?.main_content?.section6_two_column_banners?.banner_1?.image_url} className='img-fluid' alt='Organic Banner' height={245} width={1182} />
              </div>
            </Link>
          ) : dataAPI?.main_content?.section6_two_column_banners?.banner_1?.redirect_link?.link_type === 'collection' ? (
            <Link href={`/${i18Lang}/collections?category=${dataAPI?.main_content?.section6_two_column_banners?.banner_1?.redirect_link?.link}` || '/'}>
              <div className='banner-contain hover-effect'>
                <img src={dataAPI?.main_content?.section6_two_column_banners?.banner_1?.image_url} className='img-fluid' alt='Organic Banner' height={245} width={1182} />
              </div>
            </Link>
          ) : dataAPI?.main_content?.section6_two_column_banners?.banner_1?.redirect_link?.link_type === 'product' ? (
            <Link href={`/${i18Lang}/${redirectToProduct(dataAPI?.main_content?.section6_two_column_banners?.banner_1?.redirect_link?.link)}` || '/'}>
              <div className='banner-contain hover-effect'>
                <img src={dataAPI?.main_content?.section6_two_column_banners?.banner_1?.image_url} className='img-fluid' alt='Organic Banner' height={245} width={1182} />
              </div>
            </Link>
          ) : (
            <div className='banner-contain hover-effect'>
              <Image src={dataAPI?.main_content?.section6_two_column_banners?.banner_1?.image_url} className='img-fluid' alt='Organic Banner' height={245} width={1182} />
            </div>
          )}
        </Col>

        <Col xl={12} xxl={4} md={5}>
          {dataAPI?.main_content?.section6_two_column_banners?.banner_2?.redirect_link?.link_type === 'external_url' ? (
            <Link href={dataAPI?.main_content?.section6_two_column_banners?.banner_2?.redirect_link?.link || '/'} target='_blank' className='banner-contain hover-effect'>
              <Image src={dataAPI?.main_content?.section6_two_column_banners?.banner_2?.image_url} className='img-fluid' alt='Diet Soda' height={245} width={378} />
            </Link>
          ) : dataAPI?.main_content?.section6_two_column_banners?.banner_2?.redirect_link?.link_type === 'collection' ? (
            <Link href={`/${i18Lang}/collections?category=${dataAPI?.main_content?.section6_two_column_banners?.banner_2?.redirect_link?.link}` || '/'} className='banner-contain hover-effect'>
              <img src={dataAPI?.main_content?.section6_two_column_banners?.banner_2?.image_url} className='img-fluid' alt='Diet Soda' height={245} width={378} />
            </Link>
          ) : dataAPI?.main_content?.section6_two_column_banners?.banner_2?.redirect_link?.link_type === 'product' ? (
            <Link href={`/${i18Lang}/${redirectToProduct(dataAPI?.main_content?.section6_two_column_banners?.banner_2?.redirect_link?.link)}` || '/'} className='banner-contain hover-effect'>
              <img src={dataAPI?.main_content?.section6_two_column_banners?.banner_2?.image_url} className='img-fluid' alt='Diet Soda' height={245} width={378} />
            </Link>
          ) : (
            <div className='banner-contain hover-effect'>
              <img src={dataAPI?.main_content?.section6_two_column_banners?.banner_2?.image_url} className='img-fluid' alt='Diet Soda' height={245} width={378} />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TwoBanners;
