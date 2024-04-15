import { useContext } from 'react';
import { Form, Formik } from 'formik';
import CustomModal from '@/Components/Common/CustomModal';
import AccountContext from '@/Helper/AccountContext';
import useCreate from '@/Utils/Hooks/useCreate';
import { UpdateProfileAPI, UpdateProfilePasswordAPI } from '@/Utils/AxiosUtils/API';
import { YupObject, nameSchema } from '@/Utils/Validation/ValidationSchemas';
import EmailPasswordForm from './EmailPasswordForm';
import UpdatePasswordForm from './UpdatePasswordForm';

const EmailPasswordModal = ({ modal, setModal }) => {
  const { accountData, setAccountData } = useContext(AccountContext);
  const { data, mutate, isLoading } = useCreate(modal == 'email' ? UpdateProfileAPI : UpdateProfilePasswordAPI, false, false, 'No', (resDta) => {
    if (resDta.status == 200 || resDta.status == 201) {
      setModal('');
      {
        modal == 'email' &&
          setAccountData((prev) => {
            return {
              ...prev,
              name: resDta?.data?.name,
              country_code: resDta?.data?.country_code,
              phone: resDta?.data?.phone,
            };
          });
      }
    }
  });
  return (
    <>
      <CustomModal
        modal={modal == 'email' || modal == 'password' ? true : false}
        setModal={setModal}
        classes={{ modalClass: 'theme-modal', modalBodyClass: 'address-form', title: `${modal == 'email' ? 'Edit Profile' : 'ChangePassword'}` }}>
        <Formik
          initialValues={{
            name: accountData?.name || '',
            email: accountData?.email,
            country_code: accountData?.country_code || '91',
            phone: accountData?.phone || '',
            current_password: '',
            password: '',
            password_confirmation: '',
          }}
          validationSchema={YupObject({
            name: nameSchema,
            country_code: nameSchema,
            phone: nameSchema,
            current_password: modal == 'password' && nameSchema,
            password: modal == 'password' && nameSchema,
            password_confirmation: modal == 'password' && nameSchema,
          })}
          onSubmit={(values) => {
            let passwordObj = { current_password: values['current_password'], password: values['password'], password_confirmation: values['password_confirmation'], _method: 'PUT' };
            let emailObj = { name: values['name'], email: values['email'], country_code: values['country_code'], phone: values['phone'], _method: 'PUT' };
            if (modal == 'password') {
              mutate(passwordObj);
            } else {
              mutate(emailObj);
            }
          }}>
          <Form>
            {modal == 'email' && <EmailPasswordForm isLoading={isLoading} setModal={setModal} />}
            {modal == 'password' && <UpdatePasswordForm isLoading={isLoading} setModal={setModal} />}
          </Form>
        </Formik>
      </CustomModal>
    </>
  );
};

export default EmailPasswordModal;
