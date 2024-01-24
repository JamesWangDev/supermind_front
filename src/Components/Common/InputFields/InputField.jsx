import { Field } from 'formik';
import InputWrapper from '../../../Utils/HOC/InputWrapper';
import { ReactstrapInput } from '../../ReactstrapFormik';

const InputField = ({ name, ...rest }) => {
  return <Field type='text' name={name} id={name} {...rest} component={ReactstrapInput} />;
};
export default InputWrapper(InputField);
