import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import Image from 'next/image';
import ProductBox1Rating from './ProductBox1/ProductBox1Rating';
import Btn from '@/Elements/Buttons/Btn';
import TextLimit from '@/Utils/CustomFunctions/TextLimit';
import { placeHolderImage } from '../../../../Data/CommonPath';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SettingContext from '@/Helper/SettingContext';

const ModalProductDetail = ({ productObj }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  return (
    <Row className='g-sm-4 g-2'>
      <Col lg={6}>
        <div className='slider-image'>
          <Image src={productObj?.product_thumbnail?.original_url || placeHolderImage} className='img-fluid' alt={productObj?.name || ''} height={500} width={500} />
          {/* {productObj?.product_thumbnail?.original_url?<img src={productObj?.product_thumbnail?.original_url} className='img-fluid' alt={productObj?.name || ''} height={500} width={500} />:<Image src={placeHolderImage} className='img-fluid' alt={productObj?.name || ''} height={500} width={500} />} */}
        </div>
      </Col>

      <Col lg={6}>
        <div className='right-sidebar-modal'>
          <h4 className='title-name'>{productObj?.name}</h4>
          <h4 className='price'>{convertCurrency(productObj?.sale_price)}</h4>
          <div className='product-rating'>
            <ProductBox1Rating />
            <span className='ms-2'>8 {t('Reviews')}</span>
            <span className='ms-2 text-danger'>6 sold in last 16 hours</span>
          </div>

          <div className='product-detail'>
            <h4>{t('ProductDetails')} :</h4>
            <TextLimit value={productObj?.description} maxLength={150} />
          </div>
          <div className='modal-button'>
            <Btn className='btn btn-md add-cart-button icon'>{t('AddToCart')}</Btn>
            <Btn className='btn theme-bg-color view-button icon text-white fw-bold btn-md'>{t('ViewMoreDetails')}</Btn>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ModalProductDetail;
