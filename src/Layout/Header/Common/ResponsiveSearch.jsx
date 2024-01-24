import { RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { Input, InputGroup, InputGroupText } from 'reactstrap';

const ResponsiveSearch = () => {
  return (
    <div className='search-full'>
      <InputGroup>
        <InputGroupText>
          <RiSearchLine className='font-light' />
        </InputGroupText>
        <Input type='text' className='form-control search-type' placeholder='Search here..' />
        <InputGroupText className='close-search'>
          <RiCloseLine className='font-light' />
        </InputGroupText>
      </InputGroup>
    </div>
  );
};

export default ResponsiveSearch;
