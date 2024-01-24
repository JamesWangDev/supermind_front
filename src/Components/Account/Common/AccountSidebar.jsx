import React, { useContext, useState } from 'react';
import { Col } from 'reactstrap';
import SidebarProfile from '.';
import NavTabTitles from '@/Components/Common/NavTabs';
import { sidebarMenu } from '../../../../Data/AccountSidebarMenu';
import AccountContext from '@/Helper/AccountContext';
import Btn from '@/Elements/Buttons/Btn';
import { RiCloseLine } from 'react-icons/ri';

const AccountSidebar = ({ tabActive }) => {
  const [activeTab, setActiveTab] = useState({ id: tabActive });
  const { mobileSideBar, setMobileSideBar } = useContext(AccountContext);
  const handelCallback = () => {
    setMobileSideBar(!mobileSideBar);
  };
  return (
    <Col xxl={3} lg={4}>
      <div className={`dashboard-left-sidebar ${mobileSideBar ? 'show' : ''}`}>
        <div className='close-button d-flex d-lg-none' onClick={() => setMobileSideBar(!mobileSideBar)}>
          <Btn className='close-sidebar'>
            <RiCloseLine />
          </Btn>
        </div>
        <SidebarProfile />
        <NavTabTitles classes={{ navClass: 'nav-pills user-nav-pills' }} setActiveTab={setActiveTab} activeTab={activeTab} titleList={sidebarMenu} isLogout callBackFun={handelCallback} />
      </div>
    </Col>
  );
};

export default AccountSidebar;
