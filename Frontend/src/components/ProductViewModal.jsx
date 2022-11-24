import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductView from "./ProductView";
import Loading from "../components/Loading";
import Button from "./Button";

import { removeDuplicatesInArray } from "../utilities/removeDuplicatesArray";
import { getProductDetails } from "../redux/features/productDetailsSlice";
import { remove } from "../redux/features/productModalSlice";

const ProductViewModal = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const productSlug = useSelector((state) => state.productModal.value);
  const { loading, error, product } = productDetails;
  const [prod, setProd] = useState(undefined);
  const [active, setActive] = useState(false);

  useEffect(() => {
    dispatch(getProductDetails(productSlug));
    setProd(product);
  }, [productSlug, dispatch, product]);

  const processData = (data) => {
    var newData = {};
    var listColor = [];
    for (var i = 0; i < productDetails.product.product_variant.length; i++) {
      listColor.push(productDetails.product.product_variant[i].color.code);
    }
    listColor = removeDuplicatesInArray(listColor);
    Object.assign(newData, data, {
      colors: listColor,
    });
    return newData;
  };

  const checkProductView = () => {
    if (loading) {
      return <Loading />;
    } else {
      if (error !== null) {
        setActive(false);
        return <h2>HTTP Error Code: {error}</h2>;
      } else {
        return <ProductView product={processData(product)} />;
      }
    }
  };

  return (
    <div>
      <div className={`product-view__modal ${active ? "" : "active"}`}>
        <div className="product-view__modal__content">
          {checkProductView()}
          <div className="product-view__modal__content__close">
            <Button size="sm">Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
