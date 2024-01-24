import { useContext } from 'react';
import { Form, Formik } from 'formik';
import CustomModal from '@/Components/Common/CustomModal';
import { placeHolderImage } from '../../../../../Data/CommonPath';
import Avatar from '@/Components/Common/Avatar';
import SettingContext from '@/Helper/SettingContext';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { Label } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import { YupObject, nameSchema } from '@/Utils/Validation/ValidationSchemas';
import useCreate from '@/Utils/Hooks/useCreate';
import { RefundAPI } from '@/Utils/AxiosUtils/API';

const RefundModal = ({ modal, setModal, storeData }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  const { mutate, isLoading } = useCreate(RefundAPI, false, false, false, (resDta) => {
    if (resDta.status == 200 || resDta.status == 201) {
      setModal(false);
    }
  });
  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal view-modal', modalHeaderClass: 'p-0', title: 'Refund' }}>
      <Formik
        initialValues={{ reason: '', payment_type: '' }}
        validationSchema={YupObject({
          reason: nameSchema,
          payment_type: nameSchema,
          product_id: storeData?.id,
        })}
        onSubmit={(values) => {
          mutate(values);
        }}>
        {({ values, setFieldValue, errors }) => (
          <Form className='product-review-form'>
            <div className='product-wrapper'>
              <div className='product-image'>
                <Avatar data={storeData?.product_thumbnail ? storeData?.product_thumbnail : placeHolderImage} customImageClass='img-fluid' name={storeData?.name} />
              </div>
              <div className='product-content'>
                <h5 className='name'>{storeData?.name}</h5>
                <div className='product-review-rating'>
                  <div className='product-rating'>
                    <h6 className='price-number'>{convertCurrency(storeData.sale_price)}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className='review-box'>
              <SimpleInputField nameList={[{ name: 'reason', placeholder: t('EnterReason'), type: 'textarea', toplabel: 'Reason', require: 'true', rows: 3 }]} />
              <Label className='form-label' htmlFor='address1'>
                {t('PaymentOption')}
              </Label>
              <select className='form-control' name='payment_type' onChange={(e) => setFieldValue('payment_type', e.target.value)}>
                <option disabled>{t('SelectPaymentOption')}</option>
                <option value='wallet'>{t('Wallet')}</option>
                <option value='paypal'>{t('Paypal')}</option>
              </select>
              {errors['payment_type'] && <div className='invalid-feedback d-block'>{t('Paymenttypeisrequired')}</div>}
            </div>
            <Btn className='btn-md btn-theme-outline fw-bold' title='Cancel' type='button' onClick={() => setModal('')} />
            <Btn className='btn-md fw-bold text-light theme-bg-color' title='Submit' type='submit' loading={Number(isLoading)} />
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default RefundModal;
