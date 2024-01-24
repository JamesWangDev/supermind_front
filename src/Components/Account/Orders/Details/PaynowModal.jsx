import { useContext } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';
import CustomModal from '@/Components/Common/CustomModal';
import SettingContext from '@/Helper/SettingContext';
import { ModifyString } from '@/Utils/CustomFunctions/ModifyString';
import Btn from '@/Elements/Buttons/Btn';
import { ErrorMessage, Form, Formik } from 'formik';
import { YupObject, nameSchema } from '@/Utils/Validation/ValidationSchemas';
import { handleModifier } from '@/Utils/Validation/ModifiedErrorMessage';
import useCreate from '@/Utils/Hooks/useCreate';
import { RePaymentAPI } from '@/Utils/AxiosUtils/API';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const PaynowModal = ({ modal, setModal, params }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { settingData } = useContext(SettingContext);
  const { mutate, isLoading } = useCreate(RePaymentAPI, false, false, 'No', (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      if (resDta?.data?.['payment_method'] == 'cod') {
        router.push(`/account/order/${resDta?.data?.order_number}`);
      } else {
        window.open(resDta?.data?.url, '_self');
      }
    }
  });
  return (
    <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal', modalBodyClass: 'address-form', title: `PayNow` }}>
      <Formik
        initialValues={{ payment_method: '' }}
        validationSchema={YupObject({
          payment_method: nameSchema,
        })}
        onSubmit={(values) => {
          values['return_url'] = `${process.env.PAYMENT_RETURN_URL}/${i18Lang}/account/order/details`;
          values['cancel_url'] = process.env.PAYMENT_CANCEL_URL;
          values['order_number'] = params;
          mutate(values);
        }}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className='checkout-box'>
              <div className='checkout-detail'>
                <Row className='g-3'>
                  {settingData?.payment_methods?.map((payment, i) => (
                    <Col md={6} key={i}>
                      <div className='payment-option'>
                        <div className='payment-category w-100'>
                          <div className='form-check'>
                            <Input
                              className='form-check-input'
                              type='radio'
                              name='payment_method'
                              value={payment.name}
                              id={payment.name}
                              onChange={() => setFieldValue('payment_method', payment.name)}
                            />
                            <Label className='form-check-label' htmlFor={payment.name}>
                              {ModifyString(payment.name, 'upper')}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            <ErrorMessage name={'payment_method'} render={(msg) => <div className='invalid-feedback d-block'>{handleModifier(msg)}</div>} />
            <div className='modal-footer'>
              <Btn title='Cancel' className='btn-md btn-theme-outline fw-bold' onClick={() => setModal(false)} />
              <Btn title='Submit' type='submit' className='btn-md fw-bold text-light theme-bg-color' loading={Number(isLoading)} />
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default PaynowModal;
