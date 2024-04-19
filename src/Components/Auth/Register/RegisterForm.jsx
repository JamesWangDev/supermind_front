import { useContext } from 'react';
import { Form, Formik } from 'formik';
import { Col, Input, Label } from 'reactstrap';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/Helper/I18NextContext';
import { RegisterAPI } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';
import { YupObject, emailSchema, nameSchema, passwordConfirmationSchema, passwordSchema, phoneSchema } from '@/Utils/Validation/ValidationSchemas';
import FormBtn from '@/Components/Common/FormBtn';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import { AllCountryCode } from '../../../../Data/AllCountryCode';
import SearchableSelectInput from '@/Components/Common/InputFields/SearchableSelectInput';

const RegisterForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate, isLoading } = useCreate(RegisterAPI, false, `/${i18Lang}/auth/login`, 'Register Successfully');
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        // country_code: '91',
        // phone: '',
      }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        password_confirmation: passwordConfirmationSchema,
        // phone: phoneSchema,
      })}
      onSubmit={mutate}>
      {({ values, errors, touched, setFieldValue }) => (
        <Form className='row g-md-4 g-3'>
          <SimpleInputField
            nameList={[
              { name: 'name', placeholder: t('EmailAddress'), title: 'Name', label: 'FullName' },
              { name: 'email', placeholder: t('EmailAddress'), title: 'Email', label: 'EmailAddress' },
              { name: 'password', placeholder: t('Password'), type: 'password', title: 'Password', label: 'Password' },
              { name: 'password_confirmation', type: 'password', placeholder: t('ConfirmPassword'), title: 'ConfirmPassword', label: 'ConfirmPassword' },
            ]}
          />
          {/* <Col xs='12'>
            <div className='country-input'>
              <SearchableSelectInput
                nameList={[
                  {
                    name: 'country_code',
                    notitle: 'true',
                    inputprops: {
                      name: 'country_code',
                      id: 'country_code',
                      options: AllCountryCode,
                    },
                  },
                ]}
              />
              <SimpleInputField
                nameList={[
                  {
                    name: 'phone',
                    type: 'number',
                    placeholder: t('EnterPhoneNumber'),
                    // colprops: { xs: 12 },
                    colclass: 'country-input-box',
                    title: 'Phone',
                    label: 'Phone',
                    //  toplabel: 'Phone'
                  },
                ]}
              />
            </div>
          </Col> */}

          <Col xs={12}>
            <div className='forgot-box'>
              <div className='form-check remember-box'>
                <Input className='checkbox_animated check-box' type='checkbox' id='flexCheckDefault' />
                <Label className='form-check-label' htmlFor='flexCheckDefault'>
                  {t('Iagreewith')}
                  <span>{t('Terms')}</span> {t('and')} <span>{t('Privacy')}</span>
                </Label>
              </div>
            </div>
          </Col>
          <FormBtn title={'SignUp'} classes={{ btnClass: 'btn btn-animation w-100' }} loading={isLoading} />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
