import { useContext, useEffect } from 'react';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import TabFocusChecker from '@/Utils/CustomFunctions/TabFocus';
import CookiesComponent from './Cookies';
import MainFooter from './Footer';
import MainHeader from './Header';
import MobileMenu from './MobileMenu';
import NewsLetterModal from './NewsLetter/NewsLetterModal';
import RecentPurchase from './RecentPurchase';
import StickyCompare from './StickyCompare';
import TapTop from './TapTop';
import ExitModal from './ExitModal';
import Cookies from 'js-cookie';

const SubLayout = ({ children }) => {
  const isTabActive = TabFocusChecker();
  const isNewsLetter = Cookies.get('newsLetterModal');
  const { themeOption } = useContext(ThemeOptionContext);
  useEffect(() => {
    const message = ['⚡ Come Back !!!', "🔥 Don't forget this....."];
    let timer;

    const updateTitle = (index) => {
      document.title = message[index];
      timer = setTimeout(() => {
        const nextIndex = (index + 1) % message.length;
        updateTitle(nextIndex);
      }, 500);
    };

    if (!isTabActive) {
      updateTitle(0);
    } else {
      let value =
        themeOption?.general?.site_title && themeOption?.general?.site_tagline
          ? `${themeOption?.general?.site_title} | ${themeOption?.general?.site_tagline}`
          : 'Supermind Marketplace: Where Vendors Shine Together';
      document.title = value;
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isTabActive, themeOption]);
  return (
    <>
      <MainHeader />
      <MobileMenu />
      {children}
      {/* <TapTop /> */}
      <MainFooter />
      <CookiesComponent />
      {/* <StickyCompare /> */}
      {/* <RecentPurchase /> */}
      {/* {!isNewsLetter && <NewsLetterModal />} */}
      {/* <ExitModal /> */}
    </>
  );
};

export default SubLayout;
