import React, { useContext, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import CartContext from '@/Helper/CartContext';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import SettingContext from '@/Helper/SettingContext';
import HeaderCartBottom from './HeaderCartBottom';

const HeaderCartData = ({ cartStyle }) => {
  const { setCartCanvas, cartCanvas } = useContext(ThemeOptionContext);
  const [shippingCal, setShippingCal] = useState(0);
  const [shippingFreeAmt, setShippingFreeAmt] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const confettiItems = Array.from({ length: 150 }, (_, index) => index);
  const [modal, setModal] = useState(false);
  const { settingData } = useContext(SettingContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { cartProducts, getTotal } = useContext(CartContext);
  useEffect(() => {
    setShippingFreeAmt(settingData?.general?.min_order_free_shipping);
    cartProducts?.filter((elem) => {
      if (elem?.variation) {
        elem.variation.selected_variation = elem?.variation?.attribute_values?.map((values) => values.value).join('/');
      }
    });
  }, [cartProducts]);

  // Effect 2: Calculate shippingCal and confetti
  useEffect(() => {
    let tempCal = (getTotal(cartProducts) * 100) / (settingData?.general?.min_order_free_shipping || shippingFreeAmt);
    let tempConfetti = confetti;
    let timer;
    if (tempCal > 100) {
      tempCal = 100;
      if (tempConfetti === 0) {
        setConfetti((prev) => 1);
        timer = setTimeout(() => {
          // Update the confetti state after the setTimeout completes
          setConfetti((prev) => 2);
        }, 4500);
      }
    } else {
      tempConfetti = 0;
      setConfetti((prev) => 0); // Update the confetti state immediately
    }
    setShippingCal((prev) => tempCal);
    return () => clearTimeout(timer);
  }, [getTotal(cartProducts)]);
  return (
    <>
      <div className={`onhover-div ${cartStyle == 'cart_sidebar' ? 'fixed-cart' : ''} ${cartCanvas ? 'show' : ''}`}>
        <div className='cart-title'>
          <h4>{t('ShoppingCart')}</h4>
          <a onClick={() => setCartCanvas((prev) => !prev)}>
            <RiCloseLine />
          </a>
        </div>
        <HeaderCartBottom modal={modal} setModal={setModal} shippingCal={shippingCal} shippingFreeAmt={shippingFreeAmt} />
      </div>
      <div className={`confetti-wrapper ${confetti == 1 && cartCanvas ? 'show' : ''} `}>
        {confettiItems?.map((elem, i) => (
          <div className={`confetti-${elem}`} key={i}></div>
        ))}
      </div>
    </>
  );
};

export default HeaderCartData;
