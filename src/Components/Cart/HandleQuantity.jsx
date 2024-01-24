import React, { useContext, useEffect, useState } from 'react';
import { Input, InputGroup } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import CartContext from '@/Helper/CartContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';


const HandleQuantity = ({ classes = {}, productObj, elem, customIcon }) => {
  const { cartProducts, handleIncDec } = useContext(CartContext);
  const [productQty, setProductQty] = useState(0);
  useEffect(() => {
    if (cartProducts.length > 0) {
      const foundProduct = cartProducts.find((el) => el.product_id === elem?.product_id);
      if (foundProduct) {
        setProductQty(foundProduct.quantity); // Use the quantity from the found product directly
      } else {
        setProductQty(0);
      }
    } else {
      setProductQty(0);
    }
  }, [cartProducts]);
  return (
    <li className={classes?.customClass ? classes?.customClass : ''}>
      <div className='cart_qty'>
        <InputGroup>
          <Btn type='button' className='btn qty-left-minus' onClick={() => handleIncDec(-1, productObj, productQty, setProductQty, false, elem?.id)}>
            {customIcon && customIcon && productQty <= 1 ? customIcon : <RiSubtractLine />}
          </Btn>
          <Input className=' input-number qty-input' type='text' name='quantity' value={productQty} readOnly />
          <Btn type='button' className='btn qty-right-plus' onClick={() => handleIncDec(1, productObj, productQty, setProductQty, false, elem?.id)}>
            <RiAddLine />
          </Btn>
        </InputGroup>
      </div>
    </li>
  );
};

export default HandleQuantity;
