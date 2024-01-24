import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import I18NextContext from '@/Helper/I18NextContext';
import { footerMenuItems } from '../../../Data/FooterData';
import { usePathname } from 'next/navigation';

const MobileMenu = () => {
  const { i18Lang } = useContext(I18NextContext);
  const pathName = usePathname();
  const [active, setActive] = useState({});

  useEffect(() => {
    let newPath = pathName?.split(i18Lang)[1];
    if (pathName) {
      let found = false;
      footerMenuItems?.forEach((footerMenu) => {
        if (footerMenu?.path.toString() == newPath.toString()) {
          setActive(footerMenu);
          found = true;
        }
      });
      if (!found) {
        setActive(''); // Set to an empty string if the path is not found
      }
    }
  }, [pathName, i18Lang, footerMenuItems]);
  return (
    <div className='mobile-menu d-md-none d-block mobile-cart'>
      <ul>
        {footerMenuItems.map((data, index) => (
          <li className={`${active?.title == data?.title ? 'active' : ''} ${data.className ? data.className : ''}`} key={index} onClick={() => setActive(data)}>
            <Link href={`/${i18Lang}${data.path}`}>
              {active?.title == data?.title ? data.fillIcon : data.lineIcon}
              <span>{data.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
