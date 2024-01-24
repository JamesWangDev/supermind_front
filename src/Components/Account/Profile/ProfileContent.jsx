import CustomHeading from '@/Components/Common/CustomHeading';
import Image from 'next/image';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import dashboardProfile from '../../../../public/assets/images/inner-page/dashboard-profile.png';
import { LeafSVG } from '@/Components/Common/CommonSVG';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';

const ProfileContent = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className='dashboard-profile'>
      <CustomHeading title={'MyProfile'} svgUrl={<LeafSVG className='icon-width bg-gray' />} svgClass='bg-gray' />
      <div className='dashboard-bg-box'>
        <Row>
          <Col xxl={7}>
            <div className='dashboard-title mb-3'>
              <h3>{t('ProfileAbout')}</h3>
            </div>
            <Form>
              <FormGroup floating>
                <Input id='exampleEmail' name='email' placeholder={t('EnterEmail')} type='email' />
                <Label htmlFor='exampleEmail'>{t('Email')}</Label>
              </FormGroup>
              <FormGroup floating>
                <Input id='examplePassword' name='password' placeholder={t('EnterPassword')} type='password' />
                <Label htmlFor='examplePassword'>{t('Password')}</Label>
              </FormGroup>
            </Form>

            <div className='dashboard-title mb-3'>
              <h3>{t('ChangePassword')}</h3>
            </div>
            <Form>
              <FormGroup floating>
                <Input id='currentPassword' name='currentPassword' placeholder={t('EnterEmail')} type='password' />
                <Label htmlFor='currentPassword'>{t('CurrentPassword')}</Label>
              </FormGroup>
              <FormGroup floating>
                <Input id='newPassword' name='newPassword' placeholder={t('EnterNewPassword')} type='password' />
                <Label htmlFor='newPassword'>{t('NewPassword')}</Label>
              </FormGroup>
              <FormGroup floating>
                <Input id='confirmPassword' name='confirmPassword' placeholder={t('EnterConfirmPassword')} type='password' />
                <Label htmlFor='confirmPassword'>{t('ConfirmPassword')}</Label>
              </FormGroup>
            </Form>
          </Col>

          <Col xxl={5}>
            <div className='profile-image'>
              <Image src={dashboardProfile} className='img-fluid ' alt='dashboard-profile' height={428} width={428} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfileContent;
