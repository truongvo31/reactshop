import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addItem } from "../redux/features/cartItemsSlice";

import Button from "./Button";
import numberWithCommas from "../utilities/numberWithCommas";

const ProductView = (props) => {
  const dispatch = useDispatch();

  const product = props.product;

  const navigate = useNavigate();

  const [imageList, setImageList] = useState(product.product_variant[0].image);

  const [previewImage, setPreviewImage] = useState(
    product.product_variant[0].image.image
  );

  const [color, setColor] = useState(product.product_variant[0].color.code);

  const [size, setSize] = useState(product.product_variant[0].size.name);

  const [price, setPrice] = useState(product.product_variant[0].price);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const [sku, setSku] = useState(product.product_variant[0].sku);

  const [productQty, setProductQty] = useState(
    product.product_variant[0].quantity
  );

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(
        quantity < product.product_variant.find((e) => e.sku === sku).quantity
          ? quantity + 1
          : quantity
      );
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setImageList(product.product_variant[0].image);
    setPreviewImage(product.product_variant[0].image[0].image);
    setQuantity(1);
    setSize(product.product_variant[0].size.name);
    setColor(product.product_variant[0].color.code);
    setPrice(product.product_variant[0].price);
    setSku(product.product_variant[0].sku);
    setProductQty(product.product_variant[0].quantity);
  }, [product]);

  const setColorButton = (colorCode) => {
    var listVariantOfColor = product.product_variant.filter(
      (e) => e.color.code === colorCode
    );
    setColor(colorCode);
    setImageList(listVariantOfColor[0].image);
    setPreviewImage(listVariantOfColor[0].image[0].image);
    setSize(listVariantOfColor[0].size.name);
    setPrice(listVariantOfColor[0].price);
    setQuantity(1);
    setSku(
      product.product_variant.find(
        (e) =>
          e.color.code === colorCode &&
          e.size.name === listVariantOfColor[0].size.name
      ).sku
    );
    setProductQty(
      product.product_variant.find(
        (e) =>
          e.color.code === colorCode &&
          e.size.name === listVariantOfColor[0].size.name
      ).quantity
    );
  };

  const setSizeButton = (size) => {
    var productByColorAndSize = product.product_variant.find(
      (e) => e.color.code === color && e.size.name === size
    );
    setSize(size);
    setQuantity(1);
    setSku(productByColorAndSize.sku);
    setPrice(productByColorAndSize.price);
    setProductQty(productByColorAndSize.quantity);
  };

  const getListSize = () => {
    var listVariant = product.product_variant.filter(
      (e) => e.color.code === color
    );
    var listSize = [];
    for (var i = 0; i < listVariant.length; i++) {
      listSize.push(listVariant[i].size.name);
    }
    return listSize;
  };

  const addToCard = () => {
    alert("You have added " + quantity + " " + sku + " into cart");
    dispatch(
      addItem({
        sku: sku,
        quantity: quantity,
        price: price,
      })
    );
  };

  const goToCart = () => {
    //navigate(`/cart/${sku}?qty=${quantity}`);
    dispatch(
      addItem({
        sku: sku,
        quantity: quantity,
        price: price,
      })
    );
    navigate("/cart");
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          {imageList.map((item) => (
            <div
              key={item.id}
              className="product__images__list__item"
              onClick={() => {
                setPreviewImage(item.image);
              }}
            >
              <img src={item.image} alt="" />
            </div>
          ))}
        </div>
        <div className="product__images__main">
          <img src={previewImage} alt="" />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Detail</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Colapse" : "Read more"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(price)} &#165;
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Color</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => {
                  setColorButton(item);
                }}
              >
                <div
                  className={`circle`}
                  style={{ backgroundColor: item }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Size</div>
          <div className="product__info__item__list">
            {getListSize().map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => {
                  setSizeButton(item);
                }}
              >
                <span className="product__info__item__list__item__size">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Amount</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
          <div className="product__info__item__quantity__note">
            There are &nbsp;
            {productQty} in stock
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">
            You are chosing: {sku}
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={() => addToCard()}>Add to card</Button>
          <Button onClick={() => goToCart()}>Buy now</Button>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product-description__title">Detail</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div className="product-description__toggle">
          <Button
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? "Colapse" : "Read more"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductView;
