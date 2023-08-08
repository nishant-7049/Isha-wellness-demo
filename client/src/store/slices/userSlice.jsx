import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";

export const login = createAsyncThunk("login", async (object) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const data = await axios.post(
    "https://ishacare.onrender.com/api/login",
    {
      email: object.loginEmail,
      password: object.loginPassword,
      token: Cookie.get("token"),
    },
    config
  );
  return data.data;
});

export const register = createAsyncThunk("register", async (formData) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  };
  const { data } = await axios.post(
    "https://ishacare.onrender.com/api/register",
    formData,
    config
  );
  return data;
});

export const loadUser = createAsyncThunk("loaduser", async () => {
  console.log(Cookie.get("token"));
  const { data } = await axios.get(
    `https://ishacare.onrender.com/api/me/${Cookie.get("token")}`,
    {
      withCredentials: true,
    }
  );
  return data;
});

export const logOut = createAsyncThunk("logout", async () => {
  await axios.get("https://ishacare.onrender.com/api/logout", {
    withCredentials: true,
  });
  Cookie.remove("token");
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookie.set("token", action.payload.token, {
        expires: 5,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = "Invalid Email or Password";
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = "Check Credentials and Email has to be unique.";
    });
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = "LoggedOut Successfully";
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
