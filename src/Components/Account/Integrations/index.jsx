'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import AccountSidebar from '../Common/AccountSidebar';
import ResponsiveMenuOpen from '../Common/ResponsiveMenuOpen';
import { Row, Col, TabContent, TabPane } from 'reactstrap';
import IntegrationCard from './IntegrationCard';
import IntegrationModal from './IntegrationModal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const WalletContent = () => {
  const [modal, setModal] = useState(false);
  const [integration, setIntegration] = useState(null);
  const [integrations, setIntegrations] = useState([]);

  const account = localStorage.getItem('account');
  const userId = JSON.parse(account).user_id;

  console.log('got user id', userId);

  useEffect(() => {
    axios.get(`https://auth.supermind.bot/integration/${userId}`) //https://auth.supermind.bot/integration/${userId}
    .then(response => {
      setIntegrations(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }, []);

  const deactivateIntegration = (provider, userId) => {
    console.log('Deactivate integration', provider);
    if (confirm('Are you sure you want to deactivate this integration?')) {
      axios.delete(`https://auth.supermind.bot/integration/${provider}/${userId}`)
  
      // Update the connected state of the specified integration
      const updatedIntegrations = integrations.map(integration => {
        if (integration.provider === provider) {
          return { ...integration, connected: false };
        } else {
          return integration;
        }
      });
  
      setIntegrations(updatedIntegrations);
      window.location.reload();
    }
}

  const groupedIntegrations = integrations.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/2);

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  return (
    <>
      <Breadcrumb title={'Integrations'} subNavigation={[{ name: 'Integrations' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <AccountSidebar tabActive={'integrations'} />
        <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                {
                  // Map over these sub-arrays to create a new Row for each
                  groupedIntegrations.map((integrationPair, index) => (
                    <Row className='intergration-grid' key={index}>
                      {integrationPair.map((integration, index) => (
                        <Col key={index}>
                          <IntegrationCard integration={integration} integrations={integrations} setModal={setModal} setIntegration={setIntegration} deactivateIntegration={deactivateIntegration} />
                        </Col>
                      ))}
                    </Row>
                  ))
                }
              </TabPane>
            </TabContent>
            <IntegrationModal userId={userId} modal={modal} setModal={setModal} integration={integration} integrations={integrations} deactivateIntegration={deactivateIntegration} />
            
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default WalletContent;
