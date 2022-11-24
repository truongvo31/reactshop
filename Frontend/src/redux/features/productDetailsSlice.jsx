import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk(
  "productDetail",
  async (slug, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${slug}`);
      return fulfillWithValue(response.data);
    } catch (error) {
      throw rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

const productDetailsSlice = createSlice({
  name: "product",
  initialState: {
    product: { reviews: [] },
    loading: true,
    error: undefined,
  },
  extraReducers: {
    [getProductDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [getProductDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productDetailsSlice.reducer;
