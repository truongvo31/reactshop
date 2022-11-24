import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import numberWithCommas from "../utilities/numberWithCommas";
import Button from "./Button";
import CartItem from "./CartItem";

const CartView = (props) => {
  const cartItems = props.data;
  const [cartProducts, setCartProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(cartItems);
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
  }, [cartItems]);

  const sendAPI = () => {
    let result = {};
    let listProducts = [];
    cartProducts.forEach((item) => {
      let temp = {};
      Object.assign(temp, {
        sku: item.sku,
        quantity: item.quantity,
      });
      listProducts.push({
        product: temp,
      });
    });
    result = {
      products: listProducts,
      orderPrice: totalPrice,
    };
    //console.log(result);
    return true;
  };

  return (
    <div className="cart">
      <div className="cart__info">
        <div className="cart__info__txt">
          <p>
            You are having {totalProducts} product{totalProducts > 1 ? "s" : ""}
            &nbsp; in cart
          </p>
          <div className="cart__info__txt__price">
            <span>Total&nbsp;</span>
            <span>{numberWithCommas(totalPrice)}&#165;</span>
          </div>
        </div>
        <div className="cart__info__btn">
          <Button
            size={`block ${cartProducts.length > 0 ? "" : "btn-disable"}`}
            onClick={(e) => (cartProducts.length > 0 ? sendAPI() : undefined)}
          >
            Place Order
          </Button>
          <Link to="/catalog">
            <Button size="block">Continue shopping</Button>
          </Link>
        </div>
      </div>
      <div className="cart__list">
        {cartProducts.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

CartView.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CartView;
