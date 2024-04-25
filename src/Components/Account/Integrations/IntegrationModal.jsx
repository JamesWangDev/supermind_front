'use client';
import React, { use, useContext, useEffect } from 'react';
import { ModalBody, ModalHeader } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import CustomModal from '@/Components/Common/CustomModal';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { Col, Row } from 'reactstrap';
import { useState } from 'react';

import Google from '../../../../public/assets/images/integrations/google.svg';
import Asana from '../../../../public/assets/images/integrations/asana.svg';

import ApiKeyFlow from './ApiKeyFlow';
import OauthFlow from './OauthFlow';


const IntegrationModal = ({ userId, setModal, modal, integrations, integration, deactivateIntegration }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  const [currentIntegration, setCurrentIntegration] = useState({});
  const [dataFetchModal, setDataFetchModal] = useState(false);

  function getIntegrationById(provider) {
    return integrations.find(integration => integration.provider === provider);
  }

  function dataFetch() {
    window.location.reload();
  }

  useEffect(() => {
    setCurrentIntegration(getIntegrationById(integration));
    console.log('currentIntegration', getIntegrationById(integration));
  }, [integration]);


  const activateIntegration = (provider, userId) => {
    console.log('Activate integration', provider);
    window.open(`https://auth.supermind.bot/integration/${provider}/${userId}/authentication/init`, "_blank", "height=600,width=800");
    setDataFetchModal(true);
  }

  return (
    <CustomModal size='lg' modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal deal-modal modal-dialog modal-dialog-centered modal-fullscreen-sm-down', customChildren: true }}>
      <ModalHeader>
        <div>
          <h5 className='modal-title w-100'>{t('Modify integration')}</h5>
        </div>
        <Btn type='button' className='btn-close' onClick={() => setModal(false)}></Btn>
      </ModalHeader>
      <ModalBody>
        <Row>
            <Col className='integration-modal-info'>
                <img src={
                    (currentIntegration?.providerName === 'asana') ? Asana.src : Google.src
                } className='img-fluid integration-logo' alt='Integration logo' />
                {
                  dataFetchModal ?
                  <button className='btn btn-secondary button-color-transparent w-100' onClick={() => {dataFetch()}}>Finish</button>
                  :
                  currentIntegration?.connected === true ?
                  <button className='btn btn-secondary button-color-transparent w-100' onClick={() => {deactivateIntegration(currentIntegration.provider, userId)}}>Deactivate</button>
                  :
                  <button className='btn btn-secondary button-color-transparent w-100' onClick={() => {activateIntegration(currentIntegration.provider, userId)}}>Activate</button>
                }
                <p>{currentIntegration?.description}</p>
            </Col>
            <Col xl="8" className='integration-modal-content'>
                {
                  currentIntegration?.configuration?.authType === 'api-key' ?
                      <ApiKeyFlow currentIntegration={currentIntegration} /> :
                      <OauthFlow currentIntegration={currentIntegration} />
                }
                <div className='integration-modal-actions'>
                  {/* <button className='btn btn-secondary theme-bg-color' onClick={() => {setModal(true)}}>Save</button>
                  <button className='btn btn-secondary button-color-transparent' onClick={() => {setModal(true)}}>Cancel Changes</button> */}
                </div>
            </Col>
        </Row>
      </ModalBody>
    </CustomModal>
  );
};

export default IntegrationModal;
