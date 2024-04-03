import { useContext, useEffect } from 'react';
import Btn from '@/Elements/Buttons/Btn';
import CartContext from '@/Helper/CartContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { Input } from 'reactstrap';

const VariationModalQty = ({ cloneVariation, setCloneVariation }) => {
  const { cartProducts } = useContext(CartContext);
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
  const updateQuantity = (qty) => {
    if (1 > cloneVariation?.productQty + qty) return;

    setCloneVariation((prev) => {
      return { ...prev, productQty: cloneVariation?.productQty + qty };
    });
    checkStockAvailable();
  };
  useEffect(() => {
    if (cartProducts.length > 0) {
      const foundProduct = cartProducts.find((elem) => elem.product_id === cloneVariation?.product?.id);
      if (foundProduct) {
        setCloneVariation({ ...cloneVariation, productQty: foundProduct?.quantity });
      } else {
        setCloneVariation({ ...cloneVariation, productQty: 1 });
      }
    } else {
      setCloneVariation({ ...cloneVariation, productQty: 1 });
    }
  }, [cartProducts]);
  return (
    <div className='qty-box cart_qty'>
      <div className='input-group'>
        <Btn type='button' className='btn qty-left-minus' onClick={() => updateQuantity(-1)}>
          <RiSubtractLine />
        </Btn>
        <Input className='form-control input-number qty-input' type='text' name='quantity' value={cloneVariation.productQty} readOnly />
        <Btn type='button' className='btn qty-right-plus' onClick={() => updateQuantity(1)}>
          <RiAddLine />
        </Btn>
      </div>
    </div>
  );
};

export default VariationModalQty;
