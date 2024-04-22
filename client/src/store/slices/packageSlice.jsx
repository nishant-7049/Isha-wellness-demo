import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPackages = createAsyncThunk("getAllPackages", async () => {
  const config = { withCredentials: true };
  const { data } = await axios.get("https://ishacare.onrender.com/api/package/all", config);
  return data;
});

export const deletePackage = createAsyncThunk("deletePackage", async (id) => {
  const config = { withCredentials: true };
  const { data } = await axios.delete(`https://ishacare.onrender.com/api/package/delete/${id}`, config);
  return data;
});

export const createPackage = createAsyncThunk(
  "cratePackage",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post("https://ishacare.onrender.com/api/package/new", options, config);
    return data;
  }
);

export const getPackageDetail = createAsyncThunk(
  "getPackageDetail",
  async (id) => {
    const config = { withCredentials: true };
    const { data } = await axios.get(`https://ishacare.onrender.com/api/package/${id}`, config);
    return data;
  }
);

export const editPackage = createAsyncThunk("editPackage", async (options) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const { data } = await axios.put(
    `https://ishacare.onrender.com/api/package/edit/${options.id}`,
    options.data,
    config
  );
  return data;
});

export const getPackageByName = createAsyncThunk(
  "getPackageByName",
  async (name) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.get(`https://ishacare.onrender.com/api/package/name/${name}`, config);
    return data;
  }
);

const packageSlice = createSlice({
  name: "PackageSlice",
  initialState: {
    loading: false,
    error: null,
    isDeleted: false,
    isCreated: false,
    packages: null,
    pac: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetIsDeleted: (state) => {
      state.isDeleted = false;
    },
    resetIsCreated: (state) => {
      state.isCreated = false;
    },
    resetPac: (state) => {
      state.pac = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPackages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPackages.fulfilled, (state, action) => {
      state.loading = false;
      state.packages = action.payload.packages;
    });
    builder.addCase(getAllPackages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deletePackage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePackage.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
    });
    builder.addCase(deletePackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createPackage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPackage.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreated = action.payload.success;
    });
    builder.addCase(createPackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPackageDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPackageDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.pac = action.payload.package;
    });
    builder.addCase(getPackageDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPackageByName.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPackageByName.fulfilled, (state, action) => {
      state.loading = false;
      state.pac = action.payload.package;
    });
    builder.addCase(getPackageByName.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default packageSlice.reducer;
export const { clearError, resetIsDeleted, resetIsCreated, resetPac } =
  packageSlice.actions;
