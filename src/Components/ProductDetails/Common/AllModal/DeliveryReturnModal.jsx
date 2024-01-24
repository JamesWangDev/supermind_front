import CustomModal from '@/Components/Common/CustomModal';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useContext } from 'react';

const DeliveryReturnModal = ({ modal, setModal }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal view-modal modal-lg', title: 'Delivery&Return', modalBodyClass: 'policy-body' }}>
      <div dangerouslySetInnerHTML={{ __html: themeOption?.product?.shipping_and_return }} />
    </CustomModal>
  );
};

export default DeliveryReturnModal;
