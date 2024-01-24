import React, { useContext, useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import Link from 'next/link';
import { RiHomeLine, RiMailLine } from 'react-icons/ri';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import logoImage from '../../../public/assets/images/logo/1.png';
import I18NextContext from '@/Helper/I18NextContext';
import { usePathname } from 'next/navigation';
import ParisLogo from '../../../public/assets/images/logo/1.png';
import TokyoLogo from '../../../public/assets/images/logo/2.png';
import RomeLogo from '../../../public/assets/images/logo/3.png';
import MadridLogo from '../../../public/assets/images/logo/4.png';
import OtherLogo from '../../../public/assets/images/logo/6.png';
import Image from 'next/image';

const FooterLogoContent = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [logo, setLogo] = useState('');
  const { i18Lang } = useContext(I18NextContext);
  const pathName = usePathname();
  const [isImage, setIsImage] = useState(false)
  useEffect(() => {
    let tempLogo = themeOption?.logo?.header_logo?.original_url;
    let tempBoolen = false
    if (pathName == `/${i18Lang}/theme/paris` || pathName == `/${i18Lang}/home`) {
      tempBoolen = true
      tempLogo = ParisLogo;
    } else if (pathName == `/${i18Lang}/theme/tokyo`) {
      tempLogo = TokyoLogo;
      tempBoolen = true
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
    <Col xl={3} sm={6}>
      <div className='footer-logo'>
        <div className='theme-logo'>
          <Link href='/'>
            {isImage ? <Image src={logo ? logo : logoImage} alt='Footer' height={28} width={162} /> : <img src={logo ? logo : logoImage} alt='Footer' height={28} width={162} />}
          </Link>
        </div>

        <div className='footer-logo-contain'>
          {themeOption?.footer?.footer_about && <p>{themeOption?.footer?.footer_about}</p>}

          <ul className='address'>
            {themeOption?.footer?.about_address && (
              <li>
                <RiHomeLine />
                <Link href='https://www.google.com/maps' target='_blank'>
                  {themeOption?.footer?.about_address}
                </Link>
              </li>
            )}
            {themeOption?.footer?.about_email && (
              <li>
                <RiMailLine />
                <Link href={`mailto:${themeOption?.footer?.about_email}`} target='_blank'>
                  {themeOption?.footer?.about_email}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default FooterLogoContent;
