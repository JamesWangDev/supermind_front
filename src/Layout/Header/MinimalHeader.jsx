import { Col, Row } from 'reactstrap';
import HeaderLogo from './Common/HeaderLogo';
import ResponsiveSearch from './Common/ResponsiveSearch';
import MinimalNavMenu from './MinimalHeaderComponent/MinimalNavMenu';
import SearchBox from './MinimalHeaderComponent/SearchBox';
import SupportBox from './MinimalHeaderComponent/SupportBox';

const MinimalHeader = () => {
  return (
    <header className='header-3'>
      <div className='top-nav sticky-header sticky-header-2'>
        <div className='container-fluid-lg'>
          <Row>
            <Col xs={12}>
              <div className='navbar-top'>
                <HeaderLogo />
                <ResponsiveSearch />
                <SearchBox />
                <SupportBox />
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className='container-fluid-lg'>
        <Row>
          <Col xs={12} className='position-relative'>
            <MinimalNavMenu />
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default MinimalHeader;
