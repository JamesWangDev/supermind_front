import { Form, Formik } from 'formik';
import { Col, Row } from 'reactstrap';
import DeliveryAddress from './DeliveryAddress';
import DeliveryOptions from './DeliveryOptions';
import PaymentOptions from './PaymentOptions';
import { useContext, useEffect, useState } from 'react';
import AccountContext from '@/Helper/AccountContext';
import useCreate from '@/Utils/Hooks/useCreate';
import { AddressAPI } from '@/Utils/AxiosUtils/API';
import CheckoutSidebar from './CheckoutSidebar';
import { PaymentMethods } from '../../../Data/PaymentMethods';

const CheckoutForm = () => {
  const { accountData, refetch } = useContext(AccountContext);
  const [address, setAddress] = useState([]);
  const [modal, setModal] = useState('');
  useEffect(() => {
    accountData?.address.length > 0 && setAddress((prev) => [...accountData?.address]);
  }, [accountData]);
  const { mutate, isLoading } = useCreate(AddressAPI, false, false, 'Address Added successfully', (resDta) => {
    setAddress((prev) => [...prev, resDta?.data]);
    refetch();
    setModal('');
  });
  return (
    <Formik initialValues={{}}>
      {({ values, setFieldValue }) => (
        <Form>
          <div className='pb-4 checkout-section-2'>
            <Row className='g-sm-4 g-3'>
              <Col xxl='8' xl='7'>
                <div className='left-sidebar-checkout'>
                  <div className='checkout-detail-box'>
                    <ul>
                      {/* <DeliveryAddress key='shipping' type='shipping' title={'Shipping'} values={values} updateId={values['consumer_id']} setFieldValue={setFieldValue} address={address} modal={modal} mutate={mutate} isLoading={isLoading} setModal={setModal}
                      />
                      <DeliveryAddress key='billing' type='billing' title={'Billing'} values={values} updateId={values['consumer_id']} setFieldValue={setFieldValue} address={address} modal={modal} mutate={mutate} isLoading={isLoading} setModal={setModal}
                      /> */}
                      {/* <DeliveryOptions values={values} setFieldValue={setFieldValue} /> */}
                      <PaymentOptions values={values} setFieldValue={setFieldValue} paymenMethods={PaymentMethods}/>
                    </ul>
                  </div>
                </div>
              </Col>
              <CheckoutSidebar values={values} setFieldValue={setFieldValue} />
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;