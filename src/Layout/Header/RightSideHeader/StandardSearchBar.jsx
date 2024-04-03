import { useContext, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { Input } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import { useRouter } from 'next/navigation';

const StandardSearchBar = () => {
  const { i18Lang } = useContext(I18NextContext);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const onHandleSearch = () => {
    if (searchValue) {
      router.push(`/${i18Lang}/search?search=${searchValue}`);
    } else {
      router.push(`/${i18Lang}/search`);
    }
  };
  return (
    <div className='middle-box'>
      <div className='center-box'>
        <div className='searchbar-box order-xl-1 d-none d-xl-block'>
          <Input type='search' className='form-control' placeholder='search for product, delivered to your door...' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <Btn className='btn search-button' onClick={onHandleSearch}>
            <RiSearchLine />
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default StandardSearchBar;
