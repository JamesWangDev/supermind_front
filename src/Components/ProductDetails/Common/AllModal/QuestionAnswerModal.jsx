import CustomModal from '@/Components/Common/CustomModal';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { placeHolderImage } from '../../../../../Data/CommonPath';
import SettingContext from '@/Helper/SettingContext';
import Image from 'next/image';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import { QuestionAnswerAPI } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';

const QuestionAnswerModal = ({ modal, setModal, productState, update, refetch }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  const toggle = () => {
    setModal((prev) => prev !== prev);
  };
  const { mutate, isLoading } = useCreate(QuestionAnswerAPI, false, false, 'Question Send Successfully', (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      refetch && refetch();
      setModal('');
    }
  });
  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal', modalHeaderClass: 'p-0', customChildren: true }}>
      <ModalHeader toggle={toggle}>
        {t('Askaquestions')}
        <RiCloseLine className='modal-close-btn' />
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            question: update?.editData && update?.editData !== 'Add' ? update?.editData?.question : '',
            product_id: productState?.product?.id,
          }}
          onSubmit={(values) => {
            if (update && update?.editData !== 'Add') {
              update?.updateQnA(values);
            } else mutate(values);
          }}>
          {() => (
            <Form>
              <div className='product-review-form'>
                <div className='product-wrapper'>
                  <div className='product-image'>
                    {productState?.product.product_thumbnail.original_url ? <img
                      src={productState?.product.product_thumbnail.original_url}
                      className='img-fluid'
                      height={80}
                      width={80}
                      alt={productState?.product?.name}
                    /> : <Image
                      src={placeHolderImage}
                      className='img-fluid'
                      height={80}
                      width={80}
                      alt={productState?.product?.name}
                    />}
                  </div>
                  <div className='product-content'>
                    <h5 className='name'>{productState?.product?.name}</h5>
                    <div className='product-review-rating'>
                      <div className='product-rating'>
                        <h6 className='price-number'>{convertCurrency(productState?.product?.sale_price)}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='review-box'>
                  <SimpleInputField
                    nameList={[{ name: 'question', type: 'textarea', placeholder: t('EnterYourQuestions'), rows: '3', toplabel: 'YourQuestions', require: 'true', colprops: { xs: 12 } }]}
                  />
                </div>
              </div>
              <ModalFooter className='p-0'>
                <Btn title='Cancel' type='button' className='btn-md btn-theme-outline fw-bold' onClick={() => setModal(false)} />
                <Btn title='Submit' className='btn-md fw-bold text-light theme-bg-color' type='submit' loading={Number(update?.updateLoader || isLoading)} />
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </CustomModal>
  );
};

export default QuestionAnswerModal;
