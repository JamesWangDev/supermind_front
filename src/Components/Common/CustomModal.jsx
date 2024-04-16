import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const CustomModal = ({ classes = {},extraFunction, modal, setModal, fullscreen, size, ...props }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const toggle = () =>  extraFunction ?extraFunction() :setModal((prev) => prev !== prev);
  

  return (
    <Modal className={classes?.modalClass || ''} isOpen={modal} toggle={toggle} centered fullscreen={fullscreen} size={size}>
      {classes?.customChildren ? (
        props.children
      ) : (
        <>
          <ModalHeader className={classes?.modalHeaderClass || ''} toggle={toggle}>
            {classes?.title && t(classes?.title)}
            <RiCloseLine className='modal-close-btn' />
          </ModalHeader>
          <ModalBody className={classes?.modalBodyClass || ''}>{props.children}</ModalBody>
        </>
      )}
    </Modal>
  );
};

export default CustomModal;
