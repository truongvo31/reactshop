import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { updateItem, removeItem } from "../redux/features/cartItemsSlice";
import numberWithCommas from "../utilities/numberWithCommas";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);
  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);

  const updateQuantity = (option) => {
    if (option === "+") {
      dispatch(
        updateItem({
          ...item,
          quantity:
            quantity + 1 > item.product.quantity
              ? item.product.quantity
              : quantity + 1,
        })
      );
    }
    if (option === "-") {
      dispatch(
        updateItem({
          ...item,
          quantity: quantity - 1 === 0 ? 1 : quantity - 1,
        })
      );
    }
  };

  const removeCartItem = () => {
    dispatch(removeItem(item));
  };

  return (
    <div className="cart__item">
      <div className="cart__item__image">
        <img src={item.product.image[0].image} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/catalog/${item.product.slug}`}>{item.product.title}</Link>
        </div>
        <div className="cart__item__info__price">
          {numberWithCommas(Number(item.product.price))}&#165;
        </div>
        <div className="cart__item__info__quatity">
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("-")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("+")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="cart__item__del">
          <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
