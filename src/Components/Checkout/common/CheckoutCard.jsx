import React from "react";

const CheckoutCard = ({ icon, ...props }) => {
  return (
    <li>
      <div className="checkout-icon">
        {icon && icon}
      </div>
      <div className="checkout-box">
        {props.children}
      </div>
    </li>
  );
}

export default CheckoutCard;