import { useContext, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Input } from 'reactstrap';
import Cookies from 'js-cookie';
import I18NextContext from '@/Helper/I18NextContext';
import { ForgotPasswordSchema } from '@/Utils/Hooks/Auth/useForgotPassword';
import { useTranslation } from '@/app/i18n/client';
import { obscureEmail } from '@/Utils/CustomFunctions/EmailFormates';
import useOtpVerification from '@/Utils/Hooks/Auth/useOtpVerification';

const OTPVerificationForm = () => {
  const cookies = Cookies.get('ue');
  const [otp, setOtp] = useState('');
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate: otpVerification } = useOtpVerification();
  const handleChange = (e) => {
    if (e.target.value.length <= 5 && !isNaN(Number(e.target.value))) {
      setOtp(e.target.value);
    }
  };
  useEffect(() => {
    otp && otp.length === 5 && otpVerification({ email: cookies, token: otp });
  }, [otp]);
  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values) => mutate(values)}>
        {() => (
          <Form className='row g-2'>
            <div className='log-in-title'>
              <h3 className='text-content'>{t('OtpDescription')}</h3>
              <h5 className='text-content'>
                {t('CodeSend') + ' '}
                <span>{obscureEmail(cookies)}</span>
              </h5>
            </div>
            <div className='outer-otp'>
              <div className='inner-otp'>
                <Input type='text' className='no-background' maxLength='5' onChange={handleChange} value={otp} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OTPVerificationForm;
