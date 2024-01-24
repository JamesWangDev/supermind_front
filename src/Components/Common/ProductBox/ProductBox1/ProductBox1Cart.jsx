import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Input, InputGroup } from 'reactstrap';
import { useTranslation } from '@/app/i18n/client';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import CartContext from '@/Helper/CartContext';
import VariationModal from './VariationModal';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

const ProductBox1Cart = ({ productObj }) => {
  const { cartProducts, handleIncDec } = useContext(CartContext);
  const [variationModal, setVariationModal] = useState('');
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [productQty, setProductQty] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const getSelectedVariant = useMemo(() => {
    return cartProducts.find((elem) => elem.product_id === productObj.id);
  }, [cartProducts]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      const foundProduct = cartProducts.find((elem) => elem.product_id === productObj.id);
      if (foundProduct) {
        setIsOpen(true);
        setProductQty(foundProduct.quantity); // Use the quantity from the found product directly
      } else {
        setProductQty(0);
        setIsOpen(false);
      }
    } else {
      setProductQty(0);
      setIsOpen(false);
    }
  }, [cartProducts]);

  return (
    <>
      <div className='add-to-cart-box'>
        <Btn
          className='btn-add-cart addcart-button'
          disabled={productObj?.stock_status !== 'in_stock' ? true : false}
          onClick={() => {
           productObj.external_url? window.open(productObj.external_url,"_blank"): productObj?.stock_status == 'in_stock' && productObj?.type === 'classified' ? setVariationModal(productObj?.id) : handleIncDec(1, productObj, productQty, setProductQty, setIsOpen);
          }}>
          {productObj?.stock_status == 'in_stock' ? (
            <>
              {productObj?.external_url ? 
              productObj?.external_button_text || t('BuyNow')
              : <>
                  {t('Add')}
                  <span className='add-icon'>
                    <RiAddLine/>
                  </span>
                </>
              }
            </>
          ) : (
            t('SoldOut')
          )}
        </Btn>
        <div className={`cart_qty qty-box ${isOpen && productQty >= 1 ? 'open' : ''}`}>
          <InputGroup>
            <Btn type='button' className='qty-left-minus' onClick={() => handleIncDec(-1, productObj, productQty, setProductQty, setIsOpen, getSelectedVariant ? getSelectedVariant : null)}>
              <RiSubtractLine/>
            </Btn>
            <Input className='form-control input-number qty-input' type='text' name='quantity' value={productQty} readOnly />
            <Btn type='button' className='qty-right-plus' onClick={() => handleIncDec(1, productObj, productQty, setProductQty, setIsOpen, getSelectedVariant ? getSelectedVariant : null)}>
              <RiAddLine/>
            </Btn>
          </InputGroup>
        </div>
      </div>
      <VariationModal setVariationModal={setVariationModal} variationModal={variationModal} productObj={productObj} />
    </>
  );
};

export default ProductBox1Cart;