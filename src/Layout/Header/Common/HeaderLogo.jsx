'use client';
import React, { useContext, useEffect, useState } from 'react';
import Btn from '@/Elements/Buttons/Btn';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import Link from 'next/link';
import logoImage from '../../../../public/assets/images/logo/1.png';
import { RiMenuLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import ParisLogo from '../../../../public/assets/images/logo/1.png';
import TokyoLogo from '../../../../public/assets/images/logo/2.png';
import RomeLogo from '../../../../public/assets/images/logo/3.png';
import MadridLogo from '../../../../public/assets/images/logo/4.png';
import OtherLogo from '../../../../public/assets/images/logo/6.png';
import Image from 'next/image';

const HeaderLogo = () => {
  const [logo, setLogo] = useState('');
  const { themeOption, mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const pathName = usePathname();
  const [isImage, setIsImage] = useState(false)
  useEffect(() => {
    let tempLogo = themeOption?.logo?.header_logo?.original_url;
    let tempBoolen = false
    if (pathName == `/${i18Lang}/theme/paris`) {
      tempBoolen = true
      tempLogo = ParisLogo;
    } else if (pathName == `/${i18Lang}/theme/tokyo`) {
      tempBoolen = true
      tempLogo = TokyoLogo;
    } else if (pathName == `/${i18Lang}/theme/rome`) {
      tempBoolen = true
      tempLogo = RomeLogo;
    } else if (pathName == `/${i18Lang}/theme/madrid`) {
      tempBoolen = true
      tempLogo = MadridLogo;
    } else if (pathName == `/${i18Lang}/theme/berlin` || pathName == `/${i18Lang}/theme/denver`) {
      tempBoolen = true
      tempLogo = OtherLogo;
    }
    else {
      tempBoolen = false
      tempLogo = themeOption?.logo?.header_logo?.original_url || logoImage;
    }
    setIsImage(tempBoolen)
    setLogo(tempLogo);
  }, [pathName, i18Lang, themeOption?.logo?.header_logo?.original_url, isImage, logoImage]);
  return (
    <>
      <Btn className='navbar-toggler d-xl-none d-inline navbar-menu-button me-2' type='button'>
        <span className='navbar-toggler-icon' onClick={() => setMobileSideBar(!mobileSideBar)}>
          <RiMenuLine />
        </span>
      </Btn>
      <Link href='/' className='web-logo nav-logo'>
        {isImage ? <Image src={logo} className="img-fluid" alt='Header' height={64} width={162} /> : <img src={logo ? logo : logoImage} className="img-fluid" alt='Header' height={28} width={162} />}
      </Link>
    </>
  );
};

export default HeaderLogo;
