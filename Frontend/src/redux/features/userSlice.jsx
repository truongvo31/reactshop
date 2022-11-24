import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "user",
  async (credential, { rejectWithValue, fulfillWithValue }) => {
    const { email, password } = credential;
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/users/login/",
        { username: email, password: password },
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

const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    user:
      localStorage.getItem("userInfo") !== null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : undefined,
    error: undefined,
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("userInfo");
      state.user = undefined;
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = undefined;
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
