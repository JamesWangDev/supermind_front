'use client';
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { ModalBody, ModalHeader } from 'reactstrap';
import Avatar from '@/Components/Common/Avatar';
import Btn from '@/Elements/Buttons/Btn';
import { placeHolderImage } from '../../../../Data/CommonPath';
import CustomModal from '@/Components/Common/CustomModal';
import ProductContext from '@/Helper/ProductContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SettingContext from '@/Helper/SettingContext';
import NoDataFound from '@/Components/Common/NoDataFound';

const HeaderDealModal = ({ setModal, modal, data }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  const { productAPIData, setTotalDealIds, productRefetch } = useContext(ProductContext);
  useEffect(() => {
    data?.length > 0 && setTotalDealIds(Array.from(new Set(data))?.join(','));
    let timer = setTimeout(() => {
      productRefetch();
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [data]);
  return (
    <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal deal-modal modal-dialog modal-dialog-centered modal-fullscreen-sm-down', customChildren: true }}>
      <ModalHeader>
        <div>
          <h5 className='modal-title w-100'>{t('DealToday')}</h5>
          <p className='mt-1 text-content'>{t('Recommendeddealsforyou')}.</p>
        </div>
        <Btn type='button' className='btn-close' onClick={() => setModal(false)}></Btn>
      </ModalHeader>
      <ModalBody>
        {data?.length > 0 ? (
          <div className='deal-offer-box'>
            <ul className='deal-offer-list'>
              {productAPIData?.data
                ?.filter((elem) => data?.includes(elem.id))
                .map((result, i) => (
                  <li className='list-1' key={i}>
                    <div className='deal-offer-contain'>
                      <Link href={`/${i18Lang}/product/${result?.slug}`} className='deal-image'>
                        <Avatar data={result?.product_thumbnail} placeHolder={placeHolderImage} name={result?.name} height={80} width={80} />
                      </Link>

                      <Link href={`/${i18Lang}/product/${result?.slug}`} className='deal-contain'>
                        <h5>{result?.name}</h5>
                        <h6>
                          {convertCurrency(result?.sale_price)} <del>{convertCurrency(result?.price)}</del> <span>{result?.unit}</span>
                        </h6>
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <NoDataFound data={{ customClass: 'bg-second border-30 no-data-added', title: 'No Product Found' }} />
        )}
      </ModalBody>
    </CustomModal>
  );
};

export default HeaderDealModal;
