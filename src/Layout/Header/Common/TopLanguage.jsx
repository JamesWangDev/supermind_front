'use client';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/Helper/I18NextContext';
import English from '../../../../public/assets/images/country/English.png';
import Arabic from '../../../../public/assets/images/country/arabic.png';
import French from '../../../../public/assets/images/country/French.png';
import Spanish from '../../../../public/assets/images/country/Spanish.png';

const TopLanguage = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t, i18n } = useTranslation(i18Lang, 'common');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({});
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const language = [
    { id: 1, title: 'English', icon: 'en', image: English, isLang: '/en/' },
    { id: 2, title: 'Arabic', icon: 'ar', image: Arabic, isLang: '/ar/' },
    { id: 3, title: 'French', icon: 'fr', image: French, isLang: '/fr/' },
    { id: 4, title: 'Spanish', icon: 'es', image: Spanish, isLang: '/es/' },
  ];
  const isLangIncludes = language.find((lang) => pathname.includes(lang.isLang));
  const splitPathname = isLangIncludes ? pathname.split(isLangIncludes.isLang)[1] : '';
  useEffect(() => {
    setSelectedLang(language.find((elem) => elem.icon == i18Lang));
  }, []);

  // To change Language
  const handleChangeLang = (value) => {
    setSelectedLang(value);
    i18n.changeLanguage(value.icon);
  };
  return (
    <Dropdown className='theme-form-select' isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className='select-dropdown' type='button' id='select-language'>
        {selectedLang?.image && <Image src={selectedLang?.image} className='img-fluid' alt='Language Name' height={20} width={20} />}
        <span>{selectedLang?.title}</span>
      </DropdownToggle>
      <DropdownMenu className='dropdown-menu-end'>
        {language.map((elem, i) => (
          <Link href={`/${elem.icon}/${splitPathname}${searchParams ? '?' + searchParams : ''}`} onClick={() => handleChangeLang(elem)} key={i}>
            <DropdownItem id={elem.title}>
              <Image src={elem?.image} className='img-fluid' alt={elem.title} height={20} width={20} priority />
              <span>{elem.title}</span>
            </DropdownItem>
          </Link>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TopLanguage;
