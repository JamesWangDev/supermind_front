'use client';

import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import AccountSidebar from '../Common/AccountSidebar';
import { Col, TabContent, TabPane } from 'reactstrap';
import ResponsiveMenuOpen from '../Common/ResponsiveMenuOpen';
import RefundTable from './RefundTable';

const AccountRefund = () => {
  return (
    <>
      <Breadcrumb title={'Point'} subNavigation={[{ name: 'Point' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <AccountSidebar tabActive={'refund'} />

        <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <RefundTable />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default AccountRefund;
