import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const { data } = await axios.get("https://ishacare.onrender.com/admin/users");
  return data;
});

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  const { data } = await axios.delete(
    `https://ishacare.onrender.com/admin/user/delete/${id}`
  );
  return data;
});

export const editUser = createAsyncThunk("editUser", async (options) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const { data } = await axios.put(
    `https://ishacare.onrender.com/admin/user/update/${options.id}`,
    options.data,
    config
  );
  return data;
});

export const getUser = createAsyncThunk("getUser", async (id) => {
  const { data } = await axios.get(
    `https://ishacare.onrender.com/admin/user/${id}`
  );
  return data;
});

const allUserSlice = createSlice({
  name: "allUsers",
  initialState: {
    loading: false,
    error: null,
    users: [],
    user: [],
    isDeleted: false,
    isUpdated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetIsDeleted: (state) => {
      state.isDeleted = null;
    },
    resetIsUpdated: (state) => {
      state.isUpdated = null;
    },
    clearUser: (state) => {
      state.user = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default allUserSlice.reducer;
export const { clearError, resetIsDeleted, resetIsUpdated, clearUser } =
  allUserSlice.actions;
