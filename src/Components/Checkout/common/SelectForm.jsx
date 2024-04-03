import SearchableSelectInput from '@/Components/Common/InputFields/SearchableSelectInput';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import { Form } from 'formik';
import { ModalFooter, Row } from 'reactstrap';
import { AllCountryCode } from '../../../../Data/AllCountryCode';
import Btn from '@/Elements/Buttons/Btn';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const SelectForm = ({ values, isLoading, data, setModal }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Form>
      <Row>
        <SimpleInputField
          nameList={[
            { name: 'title', placeholder: t('EnterTitle'), toplabel: 'Title', colprops: { xs: 12 }, require: 'true' },
            { name: 'street', placeholder: t('EnterAddress'), toplabel: 'Address', colprops: { xs: 12 }, require: 'true' },
          ]}
        />
        <SearchableSelectInput
          nameList={[
            {
              name: 'country_id',
              require: 'true',
              title: 'Country',
              toplabel: 'Country',
              colprops: { xxl: 6, lg: 12, sm: 6 },
              inputprops: {
                name: 'country_id',
                id: 'country_id',
                options: data,
                defaultOption: 'Select state',
              },
            },
            {
              name: 'state_id',
              require: 'true',
              title: 'State',
              toplabel: 'State',
              colprops: { xxl: 6, lg: 12, sm: 6 },
              inputprops: {
                name: 'state_id',
                id: 'state_id',
                options: values?.['country_id'] ? data?.filter((country) => Number(country.id) === Number(values?.['country_id']))?.[0]?.['state'] : [],
                defaultOption: 'Select state',
              },
              disabled: values?.['country_id'] ? false : true,
            },
          ]}
        />
        <SimpleInputField
          nameList={[
            { name: 'city', placeholder: t('EnterCity'), toplabel: 'City', colprops: { xxl: 6, lg: 12, sm: 6 }, require: 'true' },
            { name: 'pincode', placeholder: t('EnterPincode'), toplabel: 'Pincode', colprops: { xxl: 6, lg: 12, sm: 6 }, require: 'true' },
          ]}
        />
        <div className='country-input'>
          <SimpleInputField
            nameList={[{ name: 'phone', type: 'number', placeholder: t('EnterPhoneNumber'), require: 'true', toplabel: 'Phone', colprops: { xs: 12 }, colclass: 'country-input-box' }]}
          />
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
        </div>
        <ModalFooter className='ms-auto justify-content-end save-back-button'>
          <Btn className='btn btn-md btn-theme-outline fw-bold' title='Cancel' onClick={() => setModal(false)} />
          <Btn className='btn-md fw-bold text-light theme-bg-color' type='submit' title='Submit' loading={Number(isLoading)} />
        </ModalFooter>
      </Row>
    </Form>
  );
};

export default SelectForm;
