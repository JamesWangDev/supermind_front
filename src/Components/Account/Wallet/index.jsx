'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import AccountSidebar from '../Common/AccountSidebar';
import ResponsiveMenuOpen from '../Common/ResponsiveMenuOpen';
import { Col, TabContent, TabPane } from 'reactstrap';
import WalletCard from './WalletCard';

const WalletContent = () => {
  return (
    <>
      <Breadcrumb title={'Wallet'} subNavigation={[{ name: 'Wallet' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <AccountSidebar tabActive={'wallet'} />

        <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <WalletCard />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default WalletContent;
