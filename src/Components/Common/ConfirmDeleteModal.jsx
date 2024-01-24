import Btn from '@/Elements/Buttons/Btn';
import { RiDeleteBinLine } from 'react-icons/ri';
import CustomModal from './CustomModal';

const ConfirmDeleteModal = ({ modal, setModal, loading, confirmFunction, setDeleteId }) => {
  return (
    <>
      <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal delete-modal', modalHeaderClass: 'p-0' }}>
        <RiDeleteBinLine className='icon-box' />
        <h5 className='modal-title'>{'Delete Item ?'}</h5>
        <p>{"This Item Will Be Deleted Permanently. You Can't Undo This Action."} </p>
        <div className='button-box'>
          <Btn title='No' className='btn btn-md btn-theme-outline fw-bold' onClick={() => {
            setDeleteId && setDeleteId();
            setModal('');
          }}
          />
          <Btn title='Yes' className='theme-bg-color btn-md fw-bold text-light' loading={Number(loading)} onClick={confirmFunction} />
        </div>
      </CustomModal>
    </>
  );
};

export default ConfirmDeleteModal;
