import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import I18NextContext from '@/Helper/I18NextContext';
import request from '@/Utils/AxiosUtils';
import { CountryAPI } from '@/Utils/AxiosUtils/API';
import { YupObject, nameSchema, phoneSchema } from '@/Utils/Validation/ValidationSchemas';
import { useTranslation } from '@/app/i18n/client';
import SelectForm from './SelectForm';

const AddAddressForm = ({ mutate, isLoading, type, editAddress, setEditAddress, modal, setModal }) => {
  useEffect(() => {
    modal !== 'edit' && setEditAddress && setEditAddress({});
  }, [modal]);
  const { data } = useQuery([CountryAPI], () => request({ url: CountryAPI }), {
    refetchOnWindowFocus: false,
    select: (res) => res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })),
  });
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Formik
      initialValues={{
        title: editAddress ? editAddress?.title : '',
        street: editAddress ? editAddress?.street : '',
        country_id: editAddress ? editAddress?.country_id : '',
        state_id: editAddress ? editAddress?.state_id : '',
        city: editAddress ? editAddress?.city : '',
        pincode: editAddress ? editAddress?.pincode : '',
        phone: editAddress ? editAddress?.phone : '',
        type: type ? type : null,
        country_code: editAddress ? editAddress?.country_code : '91',
      }}
      validationSchema={YupObject({
        title: nameSchema,
        street: nameSchema,
        city: nameSchema,
        country_id: nameSchema,
        state_id: nameSchema,
        pincode: nameSchema,
        phone: phoneSchema,
      })}
      onSubmit={(values) => {
        if (modal) {
          values['_method'] = 'PUT';
        }
        values['pincode'] = values['pincode'].toString();
        mutate(values);
      }}>
      {({ values, setFieldValue }) => <SelectForm values={values} setFieldValue={setFieldValue} setModal={setModal} isLoading={isLoading} data={data} />}
    </Formik>
  );
};

export default AddAddressForm;
