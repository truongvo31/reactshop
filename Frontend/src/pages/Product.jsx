import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//   listProducts,
//   listProductDetails,
// } from "../redux/actions/productActions";

import Section, { SectionTitle, SectionBody } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";
import Helmet from "../components/Helmet";
import ModifyProduct from "../components/ModifyProduct";
import Loading from "../components/Loading";

import { removeDuplicatesInArray } from "../utilities/removeDuplicatesArray";
import { getProducts } from "../redux/features/productSlice";
import { getProductDetails } from "../redux/features/productDetailsSlice";

const Product = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const productDetails = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProductDetails(slug));
  }, [slug, dispatch]);

  const getRandomProducts = (products, count) => {
    const max =
      products.length >= count ? products.length - count : products.length;
    const min = 0;
    const start = Math.floor(Math.random() * (max - min) + min);
    return products.slice(start, start + count);
  };

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetails.product]);

  if (productDetails.loading) {
    return <Loading />;
  } else {
    if (productDetails.error) {
      return <h2>{productDetails.error}</h2>;
    } else {
      var modifiedProducts = ModifyProduct(productList.products);
      return (
        <Helmet title={productDetails.product.title}>
          <Section>
            <SectionBody>
              <ProductView product={processData(productDetails.product)} />
            </SectionBody>
          </Section>
          <Section>
            <SectionTitle>View more</SectionTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {getRandomProducts(modifiedProducts.products, 4).map((item) => (
                  <ProductCard
                    key={item.id}
                    img={item.img}
                    title={item.title}
                    price={String(item.price)}
                    slug={item.slug}
                  />
                ))}
              </Grid>
            </SectionBody>
          </Section>
        </Helmet>
      );
    }
  }
};

export default Product;
