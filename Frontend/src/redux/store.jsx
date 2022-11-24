import { configureStore } from "@reduxjs/toolkit";

import ProductsReducer from "./features/productSlice";
import BannersReducer from "./features/bannerSlice";
import BrandsReducer from "./features/brandSlice";
import ProductDetailsSlice from "./features/productDetailsSlice";
import cartItemsSlice from "./features/cartItemsSlice";
import UserReducer from "./features/userSlice";

export default configureStore({
  reducer: {
    productList: ProductsReducer,
    bannerList: BannersReducer,
    brandList: BrandsReducer,
    productDetails: ProductDetailsSlice,
    cartItems: cartItemsSlice,
    userInfo: UserReducer,
  },
});
