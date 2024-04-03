import { useContext, useState } from 'react';
import { Col, Progress, Row } from 'reactstrap';
import Cookies from 'js-cookie';
import { RiStarFill } from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';
import Btn from '@/Elements/Buttons/Btn';
import request from '@/Utils/AxiosUtils';
import { ReviewAPI } from '@/Utils/AxiosUtils/API';
import CustomerQA from './CustomerQ&A';
import ReviewModal from './AllModal/ReviewModal';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CustomerReview = ({ productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState('');
  const isLogin = Cookies.get('uat');
  const { data, isLoading, refetch } = useQuery([ReviewAPI], () => request({ url: ReviewAPI, params: { product_id: productState?.product?.id } }), {
    enabled: isLogin ? (productState?.product?.id ? true : false) : false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });
  return (
    <>
      <Col xl={5}>
        <div className='product-rating-box'>
          <Row>
            {productState?.product?.reviews_count ? (
              <Col xl={12}>
                <div className='product-main-rating'>
                  <h2>
                    {productState?.product?.rating_count.toFixed(2)}
                    <RiStarFill />
                  </h2>
                  <h5>
                    {productState?.product?.reviews_count} {t('Ratings')}
                  </h5>
                </div>
              </Col>
            ) : null}
            <Col xl={12}>
              {productState?.product?.reviews_count ? (
                <ul className='product-rating-list'>
                  {productState?.product?.review_ratings
                    ?.slice()
                    ?.reverse()
                    .map((rate, i) => (
                      <li key={i}>
                        <div className='rating-product'>
                          <h5>
                            {productState?.product?.review_ratings?.length - 1 - i + 1}
                            <RiStarFill />
                          </h5>
                          <Progress multi>
                            <Progress value={((rate / productState?.product?.reviews_count) * 100).toFixed(0)} />
                          </Progress>
                          <h5 className='total'>{rate}</h5>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : null}
              {productState?.product?.can_review ? (
                <div className='review-title-2'>
                  <h4 className='fw-bold'>{t('Reviewthisproduct')}</h4>
                  <p>{t('Letothercustomersknowwhatyouthink')}.</p>
                  <Btn className='btn' onClick={() => setModal(productState?.product?.id)} title={productState?.product?.user_review ? t('EditReview') : t('Writeareview')} />
                </div>
              ) : null}
            </Col>
          </Row>
        </div>
      </Col>
      <ReviewModal modal={modal} setModal={setModal} productState={productState} refetch={refetch} />
      {(productState?.product?.can_review || productState?.product?.reviews_count) && <CustomerQA data={data} />}
    </>
  );
};

export default CustomerReview;
