import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const config = { withCredentials: true };

  const { data } = await axios.get("https://ishacare.onrender.com/api/admin/users", config);
  return data;
});

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  const config = { withCredentials: true };

  const { data } = await axios.delete(`https://ishacare.onrender.com/api/admin/user/delete/${id}`, config);
  return data;
});

export const editUser = createAsyncThunk("editUser", async (options) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const { data } = await axios.put(
    `https://ishacare.onrender.com/api/admin/user/update/${options.id}`,
    options.data,
    config
  );
  return data;
});

export const getUser = createAsyncThunk("getUser", async (id) => {
  const config = { withCredentials: true };

  const { data } = await axios.get(`https://ishacare.onrender.com/api/admin/user/${id}`, config);
  return data;
});

export const getBooker = createAsyncThunk("getBooker", async (id) => {
  const config = { withCredentials: true };

  const { data } = await axios.get(`https://ishacare.onrender.com/api/admin/user/${id}`, config);
  return data;
});

export const getTher = createAsyncThunk("getTher", async (id) => {
  const config = { withCredentials: true };

  const { data } = await axios.get(`https://ishacare.onrender.com/api/admin/user/${id}`, config);
  return data;
});
export const getFac = createAsyncThunk("getFac", async (id) => {
  const config = { withCredentials: true };

  const { data } = await axios.get(`https://ishacare.onrender.com/api/admin/user/${id}`, config);
  return data;
});

export const setIncharge = createAsyncThunk("setIncharge", async (options) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  };
  const { data } = await axios.put(
    `https://ishacare.onrender.com/api/admin/user/setIncharge/${options.id}`,
    { isIncharge: options.isIncharge },
    config
  );
  return data;
});

export const getTherapists = createAsyncThunk("getTherapists", async (city) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const { data } = await axios.get(`https://ishacare.onrender.com/api/therapists/${city}`, config);
  return data;
});

export const getFacilitators = createAsyncThunk(
  "getFacilitators",
  async (city) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.get(`https://ishacare.onrender.com/api/facilitators/${city}`, config);
    return data;
  }
);

const allUserSlice = createSlice({
  name: "allUsers",
  initialState: {
    loading: false,
    error: null,
    users: [],
    user: [],
    booker: null,
    ther: null,
    fac: null,
    therapists: null,
    facilitators: null,
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
      state.isUpdated = false;
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
    builder.addCase(setIncharge.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setIncharge.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    });
    builder.addCase(setIncharge.rejected, (state, action) => {
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
    builder.addCase(getBooker.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBooker.fulfilled, (state, action) => {
      state.loading = false;
      state.booker = action.payload.user;
    });
    builder.addCase(getBooker.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTher.fulfilled, (state, action) => {
      state.loading = false;
      state.ther = action.payload.user;
    });
    builder.addCase(getTher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getFac.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFac.fulfilled, (state, action) => {
      state.loading = false;
      state.fac = action.payload.user;
    });
    builder.addCase(getFac.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTherapists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTherapists.fulfilled, (state, action) => {
      state.loading = false;
      state.therapists = action.payload.therapists;
    });
    builder.addCase(getTherapists.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getFacilitators.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFacilitators.fulfilled, (state, action) => {
      state.loading = false;
      state.facilitators = action.payload.facilitators;
    });
    builder.addCase(getFacilitators.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default allUserSlice.reducer;
export const { clearError, resetIsDeleted, resetIsUpdated, clearUser } =
  allUserSlice.actions;
