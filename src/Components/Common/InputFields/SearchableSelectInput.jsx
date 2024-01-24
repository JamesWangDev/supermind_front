import SelectField from './SelectField';

const SearchableSelectInput = ({ nameList }) => {
  return (
    <>
      {nameList.map(({ name, ...rest }, i) => (
        <SelectField name={name} {...rest} key={i} />
      ))}
    </>
  );
};

export default SearchableSelectInput;
