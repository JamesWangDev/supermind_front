import React from 'react';
import { Input, Label } from 'reactstrap';

import Google from '../../../../public/assets/images/integrations/google.svg';
import Asana from '../../../../public/assets/images/integrations/asana.svg';

const ApiKeyFlow = ({ currentIntegration }) => {
  return (
    <>
        <div className='integration-modal-scopes'>
        <h4>Allow access to</h4>
            {
                Array.isArray(currentIntegration?.scopes) && currentIntegration?.scopes?.length !== 0 ?
                currentIntegration?.scopes?.map((scope, index) => (
                    <div className='integration-modal-form-scope-group'>
                        <Input type="checkbox" />
                        <img src={
                            (currentIntegration?.providerName === 'asana') ? Asana.src : Google.src
                        } className='img-fluid' width="20px" height="20px" alt='Integration logo' />
                        <Label check>
                            {scope?.name}
                        </Label>
                    </div>
                ))
                : 
                <p>No scopes found!</p>
            }
        </div>
        <div className='integration-modal-form'>
            <div className='integration-modal-form-group'>
                <span>API key</span>
                <input type="password" className='integration-modal-input' placeholder='API Key' />
            </div>
            <div className='integration-modal-form-group'>
                <span>API secret</span>
                <input type="password" className='integration-modal-input' placeholder='API Secret' />
            </div>
        </div>
    </>
  );
};

export default ApiKeyFlow;
