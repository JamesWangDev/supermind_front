import React, { useContext, useState } from 'react';
import { Table } from 'reactstrap';
import AccountContext from '@/Helper/AccountContext';
import EmailPasswordModal from './EmailPasswordModal';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const EmailPassword = () => {
  const { accountData } = useContext(AccountContext);
  const [modal, setModal] = useState('');
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <div className='table-responsive'>
        <Table>
          <tbody>
            <tr>
              <td>{t('Email')} :</td>
              <td>
                {accountData?.email}
                <span className='custom-anchor ms-2' onClick={() => setModal('email')}>
                  {t('Edit')}
                </span>
              </td>
            </tr>
            <tr>
              <td>{t('Password')} :</td>
              <td>
                ●●●●●●
                <span className='custom-anchor ms-2' onClick={() => setModal('password')}>
                  {t('Edit')}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <EmailPasswordModal modal={modal} setModal={setModal} />
    </>
  );
};

export default EmailPassword;
