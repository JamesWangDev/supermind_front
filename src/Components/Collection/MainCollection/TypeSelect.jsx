import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { filterSort } from '../../../../Data/CustomData';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { usePathname, useRouter } from 'next/navigation';

const typeOptions = [
    {
        label: "Supermind",
        value: "supermind"
    },
    {
        label: "Superpower",
        value: "superpower"
    }, 
]
const TypeSelect = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [attribute, price, category, layout] = useCustomSearchParams(['attribute', 'price', 'category', 'layout']);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const pathname = usePathname();
  const [type, setType] = useState("supermind");

  console.log(category, "ksdjfkljsdfjl")
  useEffect(() => {
    let queryParams = new URLSearchParams({ ...attribute, ...price, ...category, ...layout, type: type }).toString();
    router.push(`${pathname}?${queryParams}`);
  }, [type, category, attribute, price, layout])

  const handleSort = (data) => {
    setType(data.value)
  };
  return (
    <div className='category-dropdown'>
      <h5 className='text-title'>{t('Type')} :</h5>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          <span>{type || t('Sort')}</span>
        </DropdownToggle>
        <DropdownMenu>
          <div className="dropdown-box">
            {typeOptions.map((elem, i) => (
              <DropdownItem key={i} onClick={() => handleSort(elem)}>
                {elem.label}
              </DropdownItem>
            ))}
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default TypeSelect;
