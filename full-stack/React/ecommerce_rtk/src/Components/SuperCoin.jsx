import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SuperCoin.css";

const SuperCoin = () => {
  const [superCoinCount, setSuperCoinCount] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (totalAmount >= 100 && totalAmount < 200) {
      setSuperCoinCount(10);
    } else if (totalAmount >= 200 && totalAmount < 300) {
      setSuperCoinCount(20);
    } else if (totalAmount >= 300) {
      setSuperCoinCount(30);
    } else {
      setSuperCoinCount("");
    }
  }, [totalAmount]);

  return (
    <>
      {superCoinCount && (
        <div className="supercoin-cont">
          <p className="alert-maintext">SUPERCOIN ALERT</p>
          <p>
            You can gain additional{" "}
            <span className="supercoin-number">
              {superCoinCount} SUPERCOINS
            </span>
            !
          </p>
        </div>
      )}
    </>
  );
};

export default SuperCoin;
