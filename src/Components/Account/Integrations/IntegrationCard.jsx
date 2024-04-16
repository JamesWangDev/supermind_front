import React, { useContext, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { RiDeleteBinLine } from 'react-icons/ri';

import Google from '../../../../public/assets/images/integrations/google.svg';

const IntegrationCard = ({ integration, integrations, setModal, setIntegration, deactivateIntegration }) => {
    return (
        <div className='integration-card'>
            <Row>
                <img src={Google.src} className='img-fluid integration-logo' alt='Integration logo' />
            </Row>
            <Row>
                <h3 className='mb-2'>{integration.name}</h3>
            </Row>
            <Row>
                <Col xs={9}>
                    {
                        integration.connected === true ?
                            <button className='btn btn-secondary button-color-transparent w-100' onClick={() => {
                                setIntegration(integration.provider);
                                setModal(true);
                            }}>
                                Modify
                            </button> :

                            <button className='btn btn-secondary theme-bg-color w-100' onClick={() => {
                                setIntegration(integration.provider);
                                setModal(true);
                            }}>
                                Connect
                            </button>
                    }
                </Col>
                <Col className='integration-delete-col'>
                    <RiDeleteBinLine className='integration-delete-button' onClick={()=>deactivateIntegration(integration.provider)} />
                </Col>
            </Row>
        </div>
    );
};

export default IntegrationCard;
