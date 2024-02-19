import React, { useContext, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { filterSort } from '../../../../Data/CustomData';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { usePathname, useRouter } from 'next/navigation';

const FilterSort = ({ filter, setFilter }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [attribute, price, category, layout] = useCustomSearchParams(['attribute', 'price', 'category', 'layout']);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const pathname = usePathname();
  const handleSort = (data) => {
    setFilter((prev) => {
      return {
        ...prev,
        sortBy: data.value,
        field: data && (data.value == 'asc' || data.value == 'desc') ? 'created_at' : null,
      };
    });

    let queryParams = new URLSearchParams({ ...attribute, ...price, ...category, ...layout, sortBy: data.value }).toString();
    if (data && (data.value == 'asc' || data.value == 'desc')) {
      const fieldQuery = new URLSearchParams();
      fieldQuery.append('field', 'created_at');
      queryParams += '&' + fieldQuery.toString();
    }
    router.push(`${pathname}?${queryParams}`);
  };
  return (
    <div className='category-dropdown'>
      <h5 className='text-title'>{t('SortBy')} :</h5>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          <span>{filterSort.find((elem) => elem.value == filter.sortBy)?.label || t('Sort')}</span>
        </DropdownToggle>
        <DropdownMenu>
          <div className="dropdown-box">
            {filterSort.map((elem, i) => (
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

export default FilterSort;
