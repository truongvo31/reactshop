import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Helmet from "../components/Helmet";
import BuildingComponent from "../components/BuildingComponent";
import Loading from "../components/Loading";
import CartView from "../components/CartView";

import { getProducts } from "../redux/features/productSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.value);
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const getProductBySku = (sku) => {
    let result;
    var temp = {};
    products.forEach((i) => {
      i.product_variant.forEach((j) => {
        if (j.sku === sku) {
          Object.assign(temp, j, {
            slug: i.slug,
          });
          result = temp;
        }
      });
    });
    return result;
  };

  const getCartItemsDetails = (arr) => {
    const result = [];
    if (arr.length > 0) {
      arr.forEach((e) => {
        result.push({
          ...e,
          product: getProductBySku(e.sku),
        });
      });
    }
    return result;
  };

  if (loading) {
    return <Loading />;
  } else {
    if (error) {
      return <h2>{error}</h2>;
    } else {
      return (
        <Helmet title="Cart">
          <CartView data={getCartItemsDetails(cartItems)} />
        </Helmet>
      );
    }
  }
};

export default Cart;
