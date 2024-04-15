import { Field } from 'formik';
import InputWrapper from '@/Utils/HOC/InputWrapper';
import { ReactstrapSelect } from '@/Components/ReactstrapFormik';

const SelectField = ({ name, ...rest }) => {
  return <Field type='text' name={name} id={name} component={ReactstrapSelect} {...rest} />;
};

export default InputWrapper(SelectField);
