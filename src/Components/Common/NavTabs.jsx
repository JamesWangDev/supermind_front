import I18NextContext from '@/Helper/I18NextContext';
import { LogoutAPI } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';
import { useTranslation } from '@/app/i18n/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Nav, NavItem, NavLink } from 'reactstrap';
import ConfirmationModal from './ConfirmationModal';

const NavTabTitles = ({ classes = {}, activeTab, setActiveTab, titleList, isLogout, callBackFun }) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const checkType = (value, index) => {
    if (typeof activeTab == 'object') {
      return activeTab.id == value.id;
    } else {
      return activeTab == String(index + 1);
    }
  };
  const { mutate, isLoading } = useCreate(LogoutAPI, false, false, 'Logout Successfully', () => {
    Cookies.remove('uat');
    Cookies.remove('ue');
    Cookies.remove('account');
    Cookies.remove('CookieAccept');
    localStorage.removeItem('account');
    localStorage.removeItem('role');
    router.push(`/${i18Lang}/auth/login`);
    setModal(false);
  });
  const handleLogout = () => {
    mutate({});
  };

  const onNavClick = (elem, i) => {
    setActiveTab((prev) => (typeof prev == 'object' ? elem : String(i + 1)));
    elem.path && router.push(`/${i18Lang}${elem.path}`);
    callBackFun && callBackFun();
  };
  return (
    <>
      <Nav className={classes?.navClass}>
        {titleList.map((elem, i) => (
          <NavItem key={i}>
            <NavLink className={checkType(elem, i) ? 'active' : ''} onClick={() => onNavClick(elem, i)}>
              {elem.icon && elem.icon}
              {t(elem?.title) || t(elem?.name)}
            </NavLink>
          </NavItem>
        ))}
        {isLogout && (
          <NavItem className='logout-cls'>
            <a className='btn' onClick={() => setModal(true)}>
              <RiLogoutBoxLine className='me-2' />
              {t('LogOut')}
            </a>
          </NavItem>
        )}
      </Nav>
      <ConfirmationModal modal={modal} setModal={setModal} confirmFunction={handleLogout} isLoading={isLoading} />
    </>
  );
};

export default NavTabTitles;
