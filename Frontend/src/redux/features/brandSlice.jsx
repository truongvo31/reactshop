import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBrands = createAsyncThunk(
  "brands/all",
  async (obj, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.get("/api/brands/");
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

const brandssSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    loading: true,
    error: undefined,
  },
  extraReducers: {
    [getBrands.pending]: (state, action) => {
      state.loading = true;
    },
    [getBrands.fulfilled]: (state, action) => {
      state.loading = false;
      state.brands = action.payload;
    },
    [getBrands.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default brandssSlice.reducer;
