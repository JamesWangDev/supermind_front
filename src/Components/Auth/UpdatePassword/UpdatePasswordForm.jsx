import { useContext } from 'react';
import { Form, Formik } from 'formik';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import I18NextContext from '@/Helper/I18NextContext';
import useUpdatePassword, { UpdatePasswordSchema } from '@/Utils/Hooks/Auth/useUpdatePassword';
import { useTranslation } from '@/app/i18n/client';
import FormBtn from '@/Components/Common/FormBtn';

const UpdatePasswordForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate, isLoading } = useUpdatePassword();
  return (
    <Formik
      initialValues={{
        password: '',
        password_confirmation: '',
      }}
      validationSchema={UpdatePasswordSchema}
      onSubmit={mutate}>
      {() => (
        <Form className='row g-2'>
          <SimpleInputField
            nameList={[
              { name: 'password', placeholder: t('EmailAddress'), title: 'Password', label: 'Password' },
              { name: 'password_confirmation', placeholder: t('EnterConfirmPassword'), title: 'ConfirmPassword', label: 'Confirm Password' },
            ]}
          />
          <FormBtn title={'ForgotPassword'} classes={{ btnClass: 'btn-animation w-100 justify-content-center' }} loading={isLoading} />
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;
