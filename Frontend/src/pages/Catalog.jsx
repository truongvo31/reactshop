import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Helmet from "../components/Helmet";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import Loading from "../components/Loading";
import ModifyProduct from "../components/ModifyProduct";

import { getProducts } from "../redux/features/productSlice";
import "../utilities/min_max_array";

const Catalog = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const initFilter = {
    category: [],
    color: [],
    size: [],
    brand: [],
  };

  var categories = [];
  var colors = [];
  var sizes = [];
  var brands = [];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [filterProducts, setFilterProducts] = useState(
    ModifyProduct(products).products
  );

  const [filter, setFilter] = useState(initFilter);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item],
          });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item] });
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item] });
          break;
        case "BRAND":
          setFilter({ ...filter, brand: [...filter.brand, item] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter((e) => e !== item);
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item);
          setFilter({ ...filter, color: newColor });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item);
          setFilter({ ...filter, size: newSize });
          break;
        case "BRAND":
          const newBrand = filter.brand.filter((e) => e !== item);
          setFilter({ ...filter, brand: newBrand });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  const updateProducts = useCallback(() => {
    let temp = ModifyProduct(products).products;

    if (filter.category.length > 0) {
      temp = temp.filter((e) =>
        filter.category.includes(e.category.categoryName)
      );
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.color.find((color) => filter.color.includes(color));
        return check !== undefined;
      });
    }

    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((size) => filter.size.includes(size));
        return check !== undefined;
      });
    }

    if (filter.brand.length > 0) {
      temp = temp.filter((e) => filter.brand.includes(e.brand.brandName));
    }

    setFilterProducts(temp);
  }, [filter, products]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle("active");

  const checkProductLoaded = () => {
    if (loading) {
      return <Loading />;
    } else {
      if (error) {
        return <h3>{error}</h3>;
      } else {
        if (products.length === 0) {
          return null;
        } else {
          categories = ModifyProduct(products).categories;
          sizes = ModifyProduct(products).sizes;
          colors = ModifyProduct(products).colors;
          brands = ModifyProduct(products).brands;
          return (
            <div className="catalog">
              <div className="catalog__filter" ref={filterRef}>
                <div
                  className="catalog__filter__close"
                  onClick={() => showHideFilter()}
                >
                  <i className="bx bx-left-arrow-alt"></i>
                </div>
                <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__title">Category</div>
                  <div className="catalog__filter__widget__content">
                    {categories.map((item, index) => (
                      <div
                        key={index}
                        className="catalog__filter__widget__content__item"
                      >
                        <CheckBox
                          label={item}
                          onChange={(input) =>
                            filterSelect("CATEGORY", input.checked, item)
                          }
                          checked={filter.category.includes(item)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__title">Brand</div>
                  <div className="catalog__filter__widget__content">
                    {brands.map((item, index) => (
                      <div
                        key={index}
                        className="catalog__filter__widget__content__item"
                      >
                        <CheckBox
                          label={item}
                          onChange={(input) =>
                            filterSelect("BRAND", input.checked, item)
                          }
                          checked={filter.brand.includes(item)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__title">Color</div>
                  <div className="catalog__filter__widget__content">
                    {colors.map((item, index) => (
                      <div
                        key={index}
                        className="catalog__filter__widget__content__item"
                      >
                        <CheckBox
                          label={item}
                          onChange={(input) =>
                            filterSelect("COLOR", input.checked, item)
                          }
                          checked={filter.color.includes(item)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__title">Size</div>
                  <div className="catalog__filter__widget__content">
                    {sizes.map((item, index) => (
                      <div
                        key={index}
                        className="catalog__filter__widget__content__item"
                      >
                        <CheckBox
                          label={item}
                          onChange={(input) =>
                            filterSelect("SIZE", input.checked, item)
                          }
                          checked={filter.size.includes(item)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__content">
                    <Button size="sm" onClick={clearFilter}>
                      Reset filter
                    </Button>
                  </div>
                </div>
              </div>
              <div className="catalog__filter__toggle">
                <Button size="sm" onClick={() => showHideFilter()}>
                  Filter
                </Button>
              </div>
              <div className="catalog__content">
                <InfinityList data={filterProducts} />
              </div>
            </div>
          );
        }
      }
    }
  };

  return <Helmet title="Catalog">{checkProductLoaded()}</Helmet>;
};

export default Catalog;
