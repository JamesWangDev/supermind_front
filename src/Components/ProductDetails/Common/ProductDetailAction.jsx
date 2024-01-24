import React, { useContext } from 'react';
import { Input, InputGroup } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import CartContext from '@/Helper/CartContext';
import I18NextContext from '@/Helper/I18NextContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import AddToWishlist from '@/Components/Common/ProductBox/AddToWishlist';
import AddToCompare from '@/Components/Common/ProductBox/AddToCompare';
import AddToCartButton from './AddToCartButton';

const ProductDetailAction = ({ productState, setProductState, extraOption }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { handleIncDec, isLoading } = useContext(CartContext);
  const router = useRouter();
  const addToCart = () => {
    handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
  };
  const buyNow = () => {
    handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
    router.push(`/${i18Lang}/checkout`);
  };
  const updateQty = (qty) => {
    if (1 > productState?.productQty + qty) return;
    setProductState((prev) => {
      return { ...prev, productQty: productState?.productQty + qty };
    });
    checkStockAvailable();
  };
  const checkStockAvailable = () => {
    if (productState?.selectedVariation) {
      setProductState((prevState) => {
        const tempSelectedVariation = { ...prevState.selectedVariation };
        tempSelectedVariation.stock_status = tempSelectedVariation.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          selectedVariation: tempSelectedVariation,
        };
      });
    } else {
      setProductState((prevState) => {
        const tempProduct = { ...prevState.product };
        tempProduct.stock_status = tempProduct.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          product: tempProduct,
        };
      });
    }
  };
  return (
    <>
      <div className='note-box product-package'>
        <div className='cart_qty qty-box product-qty'>
          <InputGroup>
            <Btn type='button' className='qty-right-plus' onClick={() => updateQty(-1)}>
              <RiSubtractLine />
            </Btn>
            <Input className='input-number qty-input' type='number' value={productState?.productQty} readOnly />
            <Btn type='button' className='qty-left-minus' onClick={() => updateQty(1)}>
              <RiAddLine />
            </Btn>
          </InputGroup>
        </div>
        {extraOption !== false ? (
          <div className='wishlist-btn-group'>
            <AddToWishlist productObj={productState?.product} customClass={'wishlist-button btn'} />
            <AddToCompare productObj={productState?.product} customClass={'wishlist-button btn'} />
          </div>
        ) : null}
      </div>
      <AddToCartButton productState={productState} isLoading={isLoading} addToCart={addToCart} buyNow={buyNow} extraOption={extraOption} />
    </>
  );
};

export default ProductDetailAction;
