import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTreatmentsByTherapist = createAsyncThunk(
  "getTreatmentsByTherapist",
  async (id) => {
    const config = { withCredentials: true };
    const { data } = await axios.get(`https://ishacare.onrender.com/api/treatment/${id}`, config);
    return data;
  }
);

export const updateTreatmentExercise = createAsyncThunk(
  "updateTreatmentExercise",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `https://ishacare.onrender.com/api/treatment/update/${options.id}`,
      { exercises: options.exercises },
      config
    );
    return data;
  }
);

export const createTreatment = createAsyncThunk(
  "createTreatment",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post("https://ishacare.onrender.com/api/treatment/new", options, config);
    return data;
  }
);

export const deleteTreatment = createAsyncThunk(
  "deleteTreatment",
  async (id) => {
    const config = { withCredentials: true };
    const { data } = await axios.delete(`https://ishacare.onrender.com/api/treatment/${id}`, config);
    return data;
  }
);

export const getTreatment = createAsyncThunk("getTreatment", async (id) => {
  const config = { withCredentials: true };
  const { data } = await axios.get(`https://ishacare.onrender.com/api/treatment/${id}`, config);
  return data;
});

const TreatmentSlice = createSlice({
  name: "treatmentSlice",
  initialState: {
    loading: false,
    error: null,
    treatments: null,
    treatment: [],
    isTreatmentCreated: false,
    isTreatmentUpdated: false,
    isTreatmentDeleted: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetIsTreatmentCreated: (state) => {
      state.isTreatmentCreated = false;
    },
    resetIsTreatmentUpdated: (state) => {
      state.isTreatmentUpdated = false;
    },
    resetIsTreatmentDeleted: (state) => {
      state.isTreatmentDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTreatmentsByTherapist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTreatmentsByTherapist.fulfilled, (state, action) => {
      state.loading = false;
      state.treatments = action.payload.treatments;
    });
    builder.addCase(getTreatmentsByTherapist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTreatment.fulfilled, (state, action) => {
      state.loading = false;
      state.isTreatmentCreated = action.payload.success;
    });
    builder.addCase(createTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTreatment.fulfilled, (state, action) => {
      state.loading = false;
      state.treatment = action.payload.treatment;
    });
    builder.addCase(getTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateTreatmentExercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTreatmentExercise.fulfilled, (state, action) => {
      state.loading = false;
      state.isTreatmentUpdated = action.payload.success;
    });
    builder.addCase(updateTreatmentExercise.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTreatment.fulfilled, (state, action) => {
      state.loading = false;
      state.isTreatmentDeleted = action.payload.success;
    });
    builder.addCase(deleteTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default TreatmentSlice.reducer;
export const {
  clearError,
  resetIsTreatmentCreated,
  resetIsTreatmentUpdated,
  resetIsTreatmentDeleted,
} = TreatmentSlice.actions;
