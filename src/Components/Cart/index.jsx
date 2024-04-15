'use client';
import Breadcrumb from '../Common/Breadcrumb';
import WrapperComponent from '../Common/WrapperComponent';
import ShowCartData from './ShowCartData';

const CartContent = () => {
  return (
    <>
      <Breadcrumb title={'Cart'} subNavigation={[{ name: 'Cart' }]} />
      <WrapperComponent classes={{ sectionClass: 'cart-section section-b-space', row: 'g-sm-5 g-3' }} customCol={true}>
        <ShowCartData />
      </WrapperComponent>
    </>
  );
};

export default CartContent;
