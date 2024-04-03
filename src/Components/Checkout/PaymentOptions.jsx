import CheckoutCard from './common/CheckoutCard';
import { Col, Input, Label, Row } from 'reactstrap';
import { RiBankCardLine } from 'react-icons/ri';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/Helper/I18NextContext';
import { Fragment, useContext, useEffect, useState } from 'react';
import SettingContext from '@/Helper/SettingContext';
import { ModifyString } from '@/Utils/CustomFunctions/ModifyString';

const PaymentOptions = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { settingData } = useContext(SettingContext);
  const [intial, setInitial] = useState('');
  useEffect(() => {
    setFieldValue('payment_method', 'cod');
    setInitial(0);
  }, []);
  return (
    <CheckoutCard icon={<RiBankCardLine />}>
      <div className='checkout-title'>
        <h4>{t('PaymentOption')}</h4>
      </div>
      <div className='checkout-detail'>
        <Row className='g-sm-4 g-3'>
          {settingData?.payment_methods?.map((elem, i) => (
            <Fragment key={i}>
              {elem?.status && (
                <Col xxl={6}>
                  <div className='payment-option'>
                    <div className='payment-category w-100'>
                      <div className='form-check custom-form-check hide-check-box w-100'>
                        <Input
                          className='form-check-input'
                          id={elem?.name}
                          checked={i == intial}
                          type='radio'
                          name='payment_method'
                          onChange={() => {
                            setFieldValue('payment_method', elem.name);
                            setInitial(i);
                          }}
                        />
                        <Label className='form-check-label' htmlFor={elem.name}>
                          {ModifyString(elem?.name, 'upper')}
                        </Label>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Fragment>
          ))}
        </Row>
      </div>
    </CheckoutCard>
  );
};

export default PaymentOptions;
