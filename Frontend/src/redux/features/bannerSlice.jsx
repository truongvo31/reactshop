import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBanners = createAsyncThunk(
  "banners",
  async (obj, { rejectWithValue, fulfillWithValue }) => {
    // return fetch("/api/pyshop/banners/").then((res) => res.json());
    try {
      const response = await axios.get("/api/banners/");
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

const bannersSlice = createSlice({
  name: "banners",
  initialState: {
    banners: [],
    loading: true,
    error: undefined,
  },
  extraReducers: {
    [getBanners.pending]: (state, action) => {
      state.loading = true;
    },
    [getBanners.fulfilled]: (state, action) => {
      state.loading = false;
      state.banners = action.payload;
    },
    [getBanners.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default bannersSlice.reducer;
