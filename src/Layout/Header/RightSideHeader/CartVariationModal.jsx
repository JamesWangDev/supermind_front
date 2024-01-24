import { useContext, useEffect, useState } from 'react';
import { Input, InputGroup } from 'reactstrap';
import CustomModal from '@/Components/Common/CustomModal';
import ProductAttribute from '@/Components/ProductDetails/Common/ProductAttribute/ProductAttribute';
import Btn from '@/Elements/Buttons/Btn';
import CartContext from '@/Helper/CartContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { RiAddLine, RiShoppingCartLine, RiSubtractLine } from 'react-icons/ri';
import CartVariationNameDetails from './CartVariationNameDetails';

const CartVariationModal = ({ modal, setModal, selectedVariation = {} }) => {
  const { i18Lang } = useContext(I18NextContext);
  const [cloneVariation, setCloneVariation] = useState();
  const { replaceCartLoader, replaceCart } = useContext(CartContext);
  const { t } = useTranslation(i18Lang, 'common');

  const productInStock = cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation?.stock_status == 'in_stock' : cloneVariation?.product?.stock_status == 'in_stock';

  // Setting Selected Variation In Clone State
  useEffect(() => {
    setCloneVariation((prev) => {
      return { ...selectedVariation, attributeValues: [], selectedVariation: '', variantIds: [], productQty: selectedVariation?.quantity };
    });
  }, [selectedVariation, modal]);

  // Update Qty
  const updateQuantity = (qty) => {
    let tempQty = cloneVariation?.productQty;
    if (1 > tempQty + qty) return;
    tempQty = tempQty + qty;
    setCloneVariation((prev) => {
      return { ...prev, productQty: tempQty };
    });
    checkStockAvailable();
  };
  const checkStockAvailable = () => {
    if (cloneVariation?.selectedVariation) {
      setCloneVariation((prevState) => {
        const tempSelectedVariation = { ...prevState.selectedVariation };
        tempSelectedVariation.stock_status = tempSelectedVariation.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          selectedVariation: tempSelectedVariation,
        };
      });
    } else {
      setCloneVariation((prevState) => {
        const tempProduct = { ...prevState.product };
        tempProduct.stock_status = tempProduct.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          product: tempProduct,
        };
      });
    }
  };

  // Replace Cart
  const updateCart = (productObj) => {
    replaceCart(cloneVariation?.productQty, productObj, cloneVariation);
    setTimeout(() => {
      setModal(false);
    }, 0);
  };
  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'modal-md theme-modal variation-modal', modalHeaderClass: 'p-0' }}>
      <div className='right-box-contain'>
        <CartVariationNameDetails cloneVariation={cloneVariation} />
        {cloneVariation?.product && modal && <ProductAttribute productState={cloneVariation} setProductState={setCloneVariation} selectedVariation={selectedVariation} />}
        <div className='note-box product-package'>
          <div className='cart_qty qty-box product-qty'>
            <InputGroup>
              <Btn type='button' className='qty-left-minus' onClick={() => updateQuantity(-1)}>
                <RiSubtractLine />
              </Btn>
              <Input className='form-control input-number qty-input' type='text' name='quantity' value={cloneVariation?.productQty} readOnly />
              <Btn type='button' className='qty-right-plus' onClick={() => updateQuantity(1)}>
                <RiAddLine />
              </Btn>
            </InputGroup>
          </div>
          <Btn
            className='btn btn-md cart-button scroll-button text-white'
            disabled={(cloneVariation?.selectedVariation && cloneVariation?.selectedVariation?.stock_status !== 'in_stock') || (cloneVariation?.product?.stock_status !== 'in_stock' && true)}
            onClick={() => updateCart(cloneVariation.product)}
            loading={Number(replaceCartLoader)}>
            <RiShoppingCartLine className='me-1' />
            <span>{productInStock ? t('UpdateCart') : t('SoldOut')}</span>
          </Btn>
        </div>
      </div>
    </CustomModal>
  );
};

export default CartVariationModal;
