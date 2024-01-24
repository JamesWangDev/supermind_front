import Avatar from '@/Components/Common/Avatar';
import { Card, CardBody, Table } from 'reactstrap';
import { placeHolderImage } from '../../../../../Data/CommonPath';
import { useContext, useState } from 'react';
import RefundModal from './RefundModal';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const DetailsTable = ({ data }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState('');
  const [storeData, setStoreData] = useState('');
  const onModalOpen = (product) => {
    setStoreData(product);
    setModal(product?.id);
  };
  return (
    <>
      <Card>
        <CardBody>
          <div className='tracking-wrapper table-responsive'>
            <Table className='product-table'>
              <thead>
                <tr>
                  <th scope='col'>{t('Image')}</th>
                  <th scope='col'>{t('Name')}</th>
                  <th scope='col'>{t('Price')}</th>
                  <th scope='col'>{t('Quantity')}</th>
                  <th scope='col'>{t('Subtotal')}</th>
                  <th scope='col'>{t('RefundStatus')}</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.length > 0
                  ? data?.products?.map((product, i) => (
                      <tr key={i}>
                        <td className='product-image'>
                          <Avatar
                            data={
                              product?.pivot?.variation && product?.pivot?.variation?.variation_image
                                ? product?.pivot?.variation?.variation_image
                                : product?.product_thumbnail
                                ? product?.product_thumbnail
                                : placeHolderImage
                            }
                            name={product?.pivot?.variation ? product?.pivot?.variation?.name : product?.name}
                            customImageClass='img-fluid'
                          />
                        </td>
                        <td>
                          <h6>{product?.pivot?.variation ? product?.pivot?.variation?.name : product?.name}</h6>
                        </td>
                        <td>
                          <h6>{product?.pivot?.single_price}</h6>
                        </td>
                        <td>
                          <h6>{product?.pivot?.quantity}</h6>
                        </td>
                        <td>
                          <h6>{product?.pivot?.subtotal}</h6>
                        </td>
                        <td>{product?.is_return === 1 && product?.pivot?.is_refunded === 0 ? <a onClick={() => onModalOpen(product)}>{t('AskForRefund')}</a> : '-'}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      <RefundModal modal={modal} setModal={setModal} storeData={storeData} />
    </>
  );
};

export default DetailsTable;
