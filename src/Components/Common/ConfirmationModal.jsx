import { useContext } from 'react';
import { RiQuestionLine } from 'react-icons/ri';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import Btn from '@/Elements/Buttons/Btn';
import CustomModal from './CustomModal';

const ConfirmationModal = ({ modal, setModal, isLoading, confirmFunction }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal delete-modal', modalHeaderClass: 'p-0' }}>
      <RiQuestionLine className='icon-box wo-bg' />
      <h5 className='modal-title'>{t('Confirmation')}</h5>
      <p>{t('AreYouSure')} </p>
      <div className='button-box'>
        <Btn title='No' className='btn btn-md btn-theme-outline fw-bold' onClick={() => setModal('')} />
        <Btn title='Yes' className='theme-bg-color btn-md fw-bold text-light' loading={Number(isLoading)} onClick={confirmFunction} />
      </div>
    </CustomModal>
  );
};

export default ConfirmationModal;
