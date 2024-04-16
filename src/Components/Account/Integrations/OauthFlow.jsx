import React, { useContext, useEffect } from 'react';
import { Input, Label } from 'reactstrap';

import Google from '../../../../public/assets/images/integrations/google.svg';

const OauthFlow = ({ currentIntegration }) => {
  return (
    <>
        <div className='integration-modal-scopes'>
        <h4>Allow access to</h4>
            {
                Array.isArray(currentIntegration?.configuration?.oauth2Config?.scopes) && currentIntegration?.configuration?.oauth2Config?.scopes?.length !== 0 ?
                currentIntegration?.configuration?.oauth2Config?.scopes?.map((scope, index) => (
                    <div className='integration-modal-form-scope-group'>
                        <Input type="checkbox" checked />
                        <img src={Google.src} className='img-fluid' width="20px" height="20px" alt='Integration logo' />
                        <Label check>
                            {scope}
                        </Label>
                    </div>
                ))
                : 
                <p>No scopes found!</p>
            }
        </div>
    </>
  );
};

export default OauthFlow;
