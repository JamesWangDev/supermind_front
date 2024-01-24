import AccountContext from '@/Helper/AccountContext';
import { useContext } from 'react';
import { Table } from 'reactstrap';

const AddressTable = ({ address }) => {
  const { accountData } = useContext(AccountContext);
  return (
    <div>
      <div className='label'>
        <label>{address?.title}</label>
      </div>
      <div className='table-responsive address-table'>
        <Table>
          <tbody>
            <tr>
              <td colSpan='2'>{accountData?.name}</td>
            </tr>
            <tr>
              <td>Address :</td>
              <td>
                <p>
                  {address?.street}, {address?.city}, {address?.state?.name},{address?.country?.name}
                </p>
              </td>
            </tr>
            <tr>
              <td>Pin Code :</td>
              <td>{address?.pincode}</td>
            </tr>
            <tr>
              <td>Phone :</td>
              <td>
                +{address?.country_code} {address?.phone}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AddressTable;
