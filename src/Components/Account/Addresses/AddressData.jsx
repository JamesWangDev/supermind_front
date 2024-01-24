import ConfirmDeleteModal from '@/Components/Common/ConfirmDeleteModal';
import Btn from '@/Elements/Buttons/Btn';
import AccountContext from '@/Helper/AccountContext';
import { AddressAPI } from '@/Utils/AxiosUtils/API';
import useDelete from '@/Utils/Hooks/useDelete';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBinLine, RiEditBoxLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import AddressTable from './AddressTable';

const AddressData = ({ addressState, setAddressState, modal, setModal, setEditAddress }) => {
  const [deleteId, setDeleteId] = useState('');
  const { refetch } = useContext(AccountContext);
  const { data, mutate, isLoading } = useDelete(AddressAPI, false);
  const removeAddress = () => {
    if (deleteId) {
      mutate(deleteId);
    }
  };
  useEffect(() => {
    if (data?.status) {
      setAddressState((prev) => prev.filter((elem) => elem.id !== deleteId));
      refetch();
      setModal('');
    }
  }, [data]);
  return (
    <Row className='g-sm-4 g-3'>
      {addressState?.map((address, i) => (
        <Col xxl={4} xl={6} lg={12} md={6} key={i}>
          <div className='address-box'>
            <AddressTable address={address} />
            <div className='button-group'>
              <Btn
                className='btn-sm add-button'
                title={'Edit'}
                onClick={() => {
                  setEditAddress(address);
                  setModal('edit');
                }}>
                <RiEditBoxLine />
              </Btn>
              <Btn
                className='btn-sm add-button'
                title={'Remove'}
                onClick={() => {
                  setDeleteId(address?.id);
                  setModal('remove');
                }}>
                <RiDeleteBinLine />
              </Btn>
            </div>
          </div>
        </Col>
      ))}
      <ConfirmDeleteModal modal={modal == 'remove'} setModal={setModal} loading={isLoading} confirmFunction={removeAddress} setDeleteId={setDeleteId} />
    </Row>
  );
};

export default AddressData;
