import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createEnquiry = createAsyncThunk(
  "createEnquiry",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post("https://ishacare.onrender.com/api/enquiry/new", options, config);
    return data;
  }
);

export const getEnquiryDetail = createAsyncThunk(
  "getEnquiryDetail",
  async (id) => {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(`https://ishacare.onrender.com/api/enquiry/${id}`, config);
    return data;
  }
);

export const getEnquiries = createAsyncThunk("getEnquiries", async () => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.get("https://ishacare.onrender.com/api/enquiry", config);
  return data;
});

export const resolveEnquiry = createAsyncThunk(
  "resolveEnquiry",
  async (options) => {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.put(
      `https://ishacare.onrender.com/api/enquiry/${options.id}`,
      options.data,
      config
    );
    return data;
  }
);

const enquirySlice = createSlice({
  name: "enquirySlice",
  initialState: {
    loading: false,
    error: null,
    message: null,
    enquiry: [],
    enquiries: [],
    isResolved: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetIsResolved: (state) => {
      state.isResolved = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createEnquiry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createEnquiry.fulfilled, (state, action) => {
      state.loading = false;
      state.enquiry = action.payload.enquiry;
    });
    builder.addCase(createEnquiry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getEnquiryDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEnquiryDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.enquiry = action.payload.enquiry;
    });
    builder.addCase(getEnquiryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getEnquiries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEnquiries.fulfilled, (state, action) => {
      state.loading = false;
      state.enquiries = action.payload.enquiries;
    });
    builder.addCase(getEnquiries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(resolveEnquiry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resolveEnquiry.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(resolveEnquiry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearError, resetIsResolved } = enquirySlice.actions;
export default enquirySlice.reducer;
