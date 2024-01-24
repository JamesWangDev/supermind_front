import InputField from './InputField';

const SimpleInputField = ({ nameList }) => {
  return (
    <>
      {nameList.map(({ name, ...rest }, i) => (
        <InputField name={name} {...rest} key={i} />
      ))}
    </>
  );
};

export default SimpleInputField;
