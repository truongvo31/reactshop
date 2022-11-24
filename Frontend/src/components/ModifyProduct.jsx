import PropTypes from "prop-types";

import { removeDuplicatesInArray } from "../utilities/removeDuplicatesArray";
import "../utilities/min_max_array";

const ModifyProduct = (props) => {
  //console.log(props);
  var get_list_category = [];
  var get_list_color = [];
  var get_list_size = [];
  var get_list_brand = [];
  var img;
  var representative_product;
  var newData = [];
  for (var i = 0; i < props.length; i++) {
    get_list_category.push(props[i].category.categoryName);
    get_list_brand.push(props[i].brand.brandName);
    img = props[i].product_variant[0].image[0].image;
    representative_product = props[i].product_variant[0];
    var temp = {};
    var listSize = [];
    var listColor = [];
    var listPrice = [];
    for (var j = 0; j < props[i].product_variant.length; j++) {
      listSize.push(props[i].product_variant[j].size.name);
      listColor.push(props[i].product_variant[j].color.name);
      get_list_color.push(props[i].product_variant[j].color.name);
      get_list_size.push(props[i].product_variant[j].size.name);
      listPrice.push(props[i].product_variant[j].price);
    }
    Object.assign(temp, props[i], {
      color: removeDuplicatesInArray(listColor),
      size: removeDuplicatesInArray(listSize),
      img: img,
      price: listPrice.min(),
      representative: representative_product,
    });
    newData.push(temp);
  }
  var modifiedData = {
    products: newData,
    categories: removeDuplicatesInArray(get_list_category).sort(),
    colors: removeDuplicatesInArray(get_list_color).sort(),
    sizes: removeDuplicatesInArray(get_list_size).sort(),
    brands: removeDuplicatesInArray(get_list_brand).sort(),
  };
  return modifiedData;
};

ModifyProduct.propTypes = {
  products: PropTypes.object.isRequired,
};

export default ModifyProduct;
