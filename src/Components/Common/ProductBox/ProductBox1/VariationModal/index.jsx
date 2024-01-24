import { useState } from 'react';
import { Col, Row } from 'reactstrap';
import CustomModal from '@/Components/Common/CustomModal';
import LeftSideModal from './LeftSideModal';
import RightVariationModal from './RightSideModal';
import VariationModalQty from './VariationModalQty';
import VariationAddToCart from './VariationAddToCart';
import ProductAttribute from '@/Components/ProductDetails/Common/ProductAttribute/ProductAttribute';

const VariationModal = ({ productObj, variationModal, setVariationModal }) => {
  const [cloneVariation, setCloneVariation] = useState({ product: productObj, attributeValues: [], productQty: 1, selectedVariation: '', variantIds: [] });
  return (
    <CustomModal modal={productObj?.id == variationModal} setModal={setVariationModal} classes={{ modalClass: 'view-modal modal-lg theme-modal', modalHeaderClass: 'p-0' }}>
      <Row className='g-sm-4 g-2'>
        <LeftSideModal cloneVariation={cloneVariation} productObj={productObj} />
        <Col lg='6'>
          <div className='right-sidebar-modal'>
            <RightVariationModal cloneVariation={cloneVariation} />
            {cloneVariation?.product && productObj?.id == variationModal && <ProductAttribute productState={cloneVariation} setProductState={setCloneVariation} />}
            <div className='modal-bottom-cart'>
              <VariationModalQty cloneVariation={cloneVariation} setCloneVariation={setCloneVariation} />
              <VariationAddToCart cloneVariation={cloneVariation} setVariationModal={setVariationModal} />
            </div>
          </div>
        </Col>
      </Row>
    </CustomModal>
  );
};

export default VariationModal;
