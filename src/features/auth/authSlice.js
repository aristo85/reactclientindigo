import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../config";
import axios from "axios";
import { setToken } from "../../app/localstorage";

const initialState = {
  token: null,
  isAuth: null,
  status: "idle",
  error: null,
  isForgotPass: false,
  isResetedPass: false,
};

export const userLogin = createAsyncThunk(
  "auth/login",
  async (body, thunkApi) => {
    try {
      const response = await axios.post(config.apiUrl + "auth/login", body);
      if (response.data) setToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: error.response?.data.message,
      });
    }
  }
);

export const userSignup = createAsyncThunk(
  "auth/signup",
  async (body, thunkApi) => {
    try {
      const response = await axios.put(config.apiUrl + "auth/signup", body);
      if (response.data) setToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: error.response?.data.message,
      });
    }
  }
);

export const userResetcode = createAsyncThunk(
  "auth/resetcode",
  async (body, thunkApi) => {
    try {
      const response = await axios.post(
        config.apiUrl + "auth/forgotpass/createcode",
        body
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: error.response?.data.message,
      });
    }
  }
);

export const userResetForgotenPass = createAsyncThunk(
  "auth/resetpassword",
  async (body, thunkApi) => {
    try {
      const response = await axios.put(
        config.apiUrl + "auth/forgotpass/resetpass",
        body
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: error.response?.data.message,
      });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
      state.isResetedPass = false;
    },
    setLogout: () => initialState,
    setForgotPass: (state, action) => {
      state.isForgotPass = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action?.payload?.token;
        state.isAuth = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        if (payload) state.error = payload.message;
        state.status = "idle";
      })
      .addCase(userSignup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action?.payload?.token;
        state.isAuth = true;
      })
      .addCase(userSignup.rejected, (state, { payload }) => {
        if (payload) state.error = payload.message;
        state.status = "idle";
      })
      .addCase(userResetcode.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userResetcode.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(userResetcode.rejected, (state, { payload }) => {
        if (payload) state.error = payload.message;
        state.status = "idle";
      })
      .addCase(userResetForgotenPass.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userResetForgotenPass.fulfilled, (state, action) => {
        state.status = "idle";
        state.isResetedPass = true;
        state.isForgotPass = null;
      })
      .addCase(userResetForgotenPass.rejected, (state, { payload }) => {
        if (payload) state.error = payload.message;
        state.status = "idle";
      });
  },
});

export const { setAuth, setLogout, clearAuthError, setForgotPass } =
  authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthErr = (state) => state.auth.error;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectForgotPass = (state) => state.auth.isForgotPass;
export const selectResetedPass = (state) => state.auth.isResetedPass;

export default authSlice.reducer;
