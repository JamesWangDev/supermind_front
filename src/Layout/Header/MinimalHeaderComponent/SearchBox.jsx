import React, { useContext, useState } from 'react';
import { Input } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { RiSearchLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

const SearchBox = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
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
        <div className='searchbar-box-2 input-group d-xl-flex d-none'>
          <Btn className='btn search-icon' type='button'>
            <RiSearchLine />
          </Btn>
          <Input type='text' className='form-control' placeholder='Search for products, styles,brands...' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <Btn className='btn search-button' type='button' onClick={onHandleSearch}>
            {t('Search')}
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
