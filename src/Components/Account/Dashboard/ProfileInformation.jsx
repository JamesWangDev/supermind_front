import AccountContext from '@/Helper/AccountContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import Image from 'next/image';
import { useContext } from 'react';
import { Col, Row, Table } from 'reactstrap';
import dashProfileImage from '../../../../public/assets/images/inner-page/dashboard-profile.png';
import EmailPassword from './EmailPassword';

const ProfileInformation = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { accountData } = useContext(AccountContext);
  return (
    <div className='profile-about dashboard-bg-box'>
      <Row>
        <Col xxl={7}>
          <div className='dashboard-title mb-3'>
            <h3>{t('ProfileInformation')}</h3>
          </div>

          <div className='table-responsive'>
            <Table>
              <tbody>
                <tr>
                  <td>{t("Name")} :</td>
                  <td>{accountData?.name}</td>
                </tr>
                <tr>
                  <td>{t("PhoneNumber")} :</td>
                  <td>
                    +{accountData?.country_code} {accountData?.phone}
                  </td>
                </tr>
                <tr>
                  <td>{t("Address")} :</td>
                  <td>
                    {accountData?.address[0]?.street}
                    {accountData?.address[0]?.city}, {accountData?.address[0]?.state.name}, {accountData?.address[0]?.country.name} {accountData?.address[0]?.pincode}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className='dashboard-title mb-3'>
            <h3>{t("LoginDetails")}</h3>
          </div>
          <EmailPassword />
        </Col>
        <Col xxl={5}>
          <div className='profile-image'>
            <Image src={dashProfileImage} className='img-fluid' alt='profile-image' height={450} width={450} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileInformation;
