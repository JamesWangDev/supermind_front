'use client';
import { Fragment } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CheckoutForm from './CheckoutForm';
import WrapperComponent from '../Common/WrapperComponent';

const CheckoutContent = () => {
  return (
    <Fragment>
      <Breadcrumb title={'Checkout'} subNavigation={[{ name: 'Checkout' }]} />
      <WrapperComponent classes={{ sectionClass: 'compare-section section-b-space', row: 'g-0 compare-row' }} customCol={true}>
        <CheckoutForm />
      </WrapperComponent>
    </Fragment>
  );
};

export default CheckoutContent;
