import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "register",
  async (credential, { rejectWithValue, fulfillWithValue }) => {
    const { firstname, lastname, email, password } = credential;
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/users/register/",
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        },
        settings
      );
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

const registerSlice = createSlice({
  name: "registerUser",
  initialState: {
    user:
      localStorage.getItem("userInfo") !== null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : undefined,
    error: undefined,
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = undefined;
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default registerSlice.reducer;
