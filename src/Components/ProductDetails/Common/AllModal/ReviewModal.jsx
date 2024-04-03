import { useContext } from 'react';
import { Form, Formik } from 'formik';
import Avatar from '@/Components/Common/Avatar';
import CustomModal from '@/Components/Common/CustomModal';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import { YupObject, nameSchema } from '@/Utils/Validation/ValidationSchemas';
import { useTranslation } from '@/app/i18n/client';
import useCreate from '@/Utils/Hooks/useCreate';
import { ReviewAPI } from '@/Utils/AxiosUtils/API';
import { placeHolderImage } from '../../../../../Data/CommonPath';
import ProductBox1Rating from '@/Components/Common/ProductBox/ProductBox1/ProductBox1Rating';
import { ModalFooter } from 'reactstrap';

const ReviewModal = ({ modal, setModal, productState, refetch }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate, isLoading } = useCreate(productState?.product?.user_review ? `${ReviewAPI}/${productState?.product.user_review.id}` : ReviewAPI, false, false, false, (resDta) => {
    if (resDta.status == 200 || resDta.status == 201) {
      refetch();
      setModal(false);
    }
  });
  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal', title: productState?.product?.user_review ? 'EditReview' : 'Writeareview' }}>
      <Formik
        initialValues={{ rating: productState?.product?.user_review?.rating, description: productState?.product?.user_review?.description, product_id: productState?.product?.id, review_image_id: '' }}
        validationSchema={YupObject({
          rating: nameSchema,
        })}
        onSubmit={(values) => {
          if (productState?.product?.user_review) {
            values['_method'] = 'PUT';
          }
          mutate(values);
        }}>
        {({ values, setFieldValue, errors }) => (
          <Form className='product-review-form'>
            <div className='product-wrapper'>
              <div className='product-image'>
                <Avatar data={productState?.product?.product_thumbnail ? productState?.product?.product_thumbnail : placeHolderImage} customImageClass='img-fluid' name={productState?.product?.name} />
              </div>
              <div className='product-content'>
                <h5 className='name'>{productState?.product?.name}</h5>
                <div className='product-review-rating'>
                  <label>{'Rating'}</label>
                  <div className='product-rating'>
                    <ProductBox1Rating totalRating={productState?.product?.rating_count} />
                    <h6 className='rating-number'>{productState?.product?.rating_count?.toFixed(2) || 0}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className='review-box'>
              <div className='product-review-rating'>
                <label>{'Rating'}</label>
                <div className='product-rating'>
                  <ProductBox1Rating totalRating={productState?.product?.user_review?.rating} clickAble={true} setFieldValue={setFieldValue} name={'rating'} />
                </div>
              </div>
            </div>
            <div className='review-box'>
              <SimpleInputField nameList={[{ name: 'description', placeholder: t('EnterDescription'), type: 'textarea', toplabel: 'ReviewContent', rows: 3 }]} />
            </div>
            <ModalFooter className='pt-0'>
              <Btn className='btn-md btn-theme-outline fw-bold' title='Cancel' type='button' onClick={() => setModal('')} />
              <Btn className='btn-md fw-bold text-light theme-bg-color' title='Submit' type='submit' loading={Number(isLoading)} />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default ReviewModal;
