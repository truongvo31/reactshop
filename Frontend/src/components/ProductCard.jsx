import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import Button from "./Button";

import numberWithCommas from "../utilities/numberWithCommas";

const ProductCard = (props) => {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={props.img} alt="" />
      </div>
      <h3 className="product-card__name">{props.title}</h3>
      <div className="product-card__price">
        From {numberWithCommas(props.price)}&#165;
      </div>
      <Link to={`/catalog/${props.slug}`}>
        <div className="product-card__button">
          <Button size="sm" icon="bx bx-cart" animated={true}>
            Buy now
          </Button>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductCard;
