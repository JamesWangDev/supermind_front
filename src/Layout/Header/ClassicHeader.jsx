import { useContext } from 'react';
import { FiBookmark } from 'react-icons/fi';
import { Col, Row } from 'reactstrap';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useHeaderScroll } from '@/Utils/HeaderScroll';
import ClassicHeaderMenu from './Common/ClassicHeaderMenu';
import HeaderLogo from './Common/HeaderLogo';
import HeaderTopBar from './Common/HeaderTopBar';
import RightSideHeader from './RightSideHeader';

const ClassicHeader = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const UpScroll = useHeaderScroll(false);
  return (
    <header className={themeOption?.header?.sticky_header_enable && UpScroll ? 'active' : ''}>
      {themeOption?.header?.page_top_bar_enable && <HeaderTopBar />}

      <div className='top-nav top-header sticky-header'>
        <div className='container-fluid-lg'>
          <Row>
            <Col xs='12'>
              <div className='navbar-top'>
                <HeaderLogo />
                <ClassicHeaderMenu />
                <RightSideHeader noContactUs={true} wishListIcon={<FiBookmark />} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </header>
  );
};

export default ClassicHeader;
