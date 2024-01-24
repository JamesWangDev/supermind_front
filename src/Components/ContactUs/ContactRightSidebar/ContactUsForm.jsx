import { useContext } from 'react';
import { Row } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import { Form, Formik } from 'formik';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { YupObject, emailSchema, nameSchema, phoneSchema } from '@/Utils/Validation/ValidationSchemas';
import useCreate from '@/Utils/Hooks/useCreate';
import { ContactUsAPI } from '@/Utils/AxiosUtils/API';
import { RiChat2Fill, RiMailFill, RiSmartphoneLine, RiUserFill } from 'react-icons/ri';

const ContactUsForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate, isLoading } = useCreate(ContactUsAPI, false, `/${i18Lang}/paris`, 'No');
  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', subject: '', message: '' }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
        subject: nameSchema,
        message: nameSchema,
      })}
      onSubmit={mutate}>
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Row>
            <SimpleInputField
              nameList={[
                { name: 'name', placeholder: t('EnterFullName'), toplabel: 'Full Name', inputaddon: 'true', prefixvalue: <RiUserFill />, colprops: { xs: 12 } },
                { name: 'email', placeholder: t('EnterEmail'), toplabel: 'Email Address', inputaddon: 'true', prefixvalue: <RiMailFill />, colprops: { xxl: 6, lg: 12, sm: 6 } },
                {
                  name: 'phone',
                  placeholder: t('EnterPhoneNumber'),
                  toplabel: 'Phone Number',
                  inputaddon: 'true',
                  prefixvalue: <RiSmartphoneLine />,
                  type: 'number',
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                { name: 'subject', placeholder: t('EnterSubject'), toplabel: 'Subject', inputaddon: 'true', prefixvalue: <RiUserFill />, colprops: { xs: 12 } },
                { name: 'message', placeholder: t('EnterYourMessage'), toplabel: 'Message', inputaddon: 'true', prefixvalue: <RiChat2Fill />, colprops: { xs: 12 }, type: 'textarea', rows: 5 },
              ]}
            />
          </Row>
          <Btn className='btn btn-animation btn-md fw-bold ms-auto' type='submit' loading={Number(isLoading)}>
            {t('SendMessage')}
          </Btn>
        </Form>
      )}
    </Formik>
  );
};

export default ContactUsForm;
