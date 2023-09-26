import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTesti = createAsyncThunk("createTesti", async (fd) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const { data } = await axios.post(
    "https://ishacare.onrender.com/api/testi/create",
    fd,
    config
  );
  return data;
});

export const getTesti = createAsyncThunk("getTestimonial", async (options) => {
  const { data } = await axios.get(
    `https://ishacare.onrender.com/api/testi/${options.cluster}/${options.itemsPerPage}?page=${options.page}`
  );
  return data;
});

export const deleteTesti = createAsyncThunk("deleteTestimonial", async (id) => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.delete(
    `https://ishacare.onrender.com/api/testi/${id}`,
    config
  );
  return data;
});

export const getSingleTesti = createAsyncThunk("getTestiDetail", async (id) => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.get(
    `https://ishacare.onrender.com/api/testi/${id}`,
    config
  );
  return data;
});

export const editTesti = createAsyncThunk("editTesti", async (options) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const { data } = await axios.put(
    `https://ishacare.onrender.com/api/testi/${options.id}`,
    options.formdata,
    config
  );
  return data;
});

const testiSlice = createSlice({
  name: "testimonial",
  initialState: {
    testiLoading: false,
    testiError: null,
    testimonial: null,
    totalTestimonial: null,
    testimonials: [],
    isDeleted: false,
    isUpdated: false,
  },
  reducers: {
    clearTestiError: (state) => {
      state.testiError = null;
    },
    deleteReset: (state) => {
      state.isDeleted = false;
    },
    updateReset: (state) => {
      state.isUpdated = false;
    },
    clearTesti: (state) => {
      state.testimonial = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTesti.pending, (state) => {
      state.testiLoading = true;
    });
    builder.addCase(createTesti.fulfilled, (state, action) => {
      state.testiLoading = false;
      state.testimonial = action.payload.testi;
    });
    builder.addCase(createTesti.rejected, (state, action) => {
      state.testiLoading = false;
      state.testiError = action.error.message;
    });
    builder.addCase(getTesti.pending, (state) => {
      state.testiLoading = true;
    });
    builder.addCase(getTesti.fulfilled, (state, action) => {
      state.testiLoading = false;
      state.testimonials = action.payload.testi;
      state.totalTestimonial = action.payload.totalTesti;
    });
    builder.addCase(getTesti.rejected, (state, action) => {
      state.testiLoading = false;
      state.testiError = action.error.message;
    });
    builder.addCase(deleteTesti.pending, (state) => {
      state.testiLoading = true;
    });
    builder.addCase(deleteTesti.fulfilled, (state, action) => {
      state.testiLoading = false;
      state.isDeleted = action.payload.success;
    });
    builder.addCase(deleteTesti.rejected, (state, action) => {
      state.testiLoading = false;
      state.testiError = action.error.message;
    });
    builder.addCase(getSingleTesti.pending, (state) => {
      state.testiLoading = true;
    });
    builder.addCase(getSingleTesti.fulfilled, (state, action) => {
      state.testiLoading = false;
      state.testimonial = action.payload.testi;
    });
    builder.addCase(getSingleTesti.rejected, (state, action) => {
      state.testiLoading = false;
      state.testiError = action.error.message;
    });
    builder.addCase(editTesti.pending, (state) => {
      state.testiLoading = true;
    });
    builder.addCase(editTesti.fulfilled, (state, action) => {
      state.testiLoading = false;
      state.isUpdated = action.payload.success;
    });
    builder.addCase(editTesti.rejected, (state, action) => {
      state.testiLoading = false;
      state.testiError = action.error.message;
    });
  },
});

export default testiSlice.reducer;
export const { clearTestiError, deleteReset, clearTesti, updateReset } =
  testiSlice.actions;
