import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import SettingContext from '@/Helper/SettingContext';
import CurrencyContext from '@/Helper/CurrencyContext';

const HeaderCurrency = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { settingData, selectedCurrency, setSelectedCurrency } = useContext(SettingContext);
  const { currencyState } = useContext(CurrencyContext);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    let getDefaultCurrency = JSON.parse(localStorage.getItem('selectedCurrency'));
    setSelectedCurrency(getDefaultCurrency);
  }, []);

  const handleClick = (value) => {
    setSelectedCurrency(value);
    localStorage.setItem('selectedCurrency', JSON.stringify(value));
  };

  if (!currencyState?.length) return null;
  return (
    <Dropdown className='theme-form-select' isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className='select-dropdown' type='button'>
        <span>{selectedCurrency ? selectedCurrency?.code : settingData?.general?.default_currency?.code}</span>
      </DropdownToggle>
      <DropdownMenu className='dropdown-menu-end sm-dropdown-menu'>
        {currencyState?.map((elem, i) => (
          <DropdownItem id={elem.title} key={elem.id} onClick={() => handleClick(elem)}>
            {elem?.symbol} {elem?.code}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default HeaderCurrency;
