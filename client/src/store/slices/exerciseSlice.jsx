import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllExercises = createAsyncThunk("getAllExercises", async () => {
  const { data } = await axios.get("https://ishacare.onrender.com/api/exercise/");
  return data;
});

export const createExercise = createAsyncThunk(
  "newExercise",
  async (options) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.post("https://ishacare.onrender.com/api/exercise/new", options, config);
    return data;
  }
);

export const deleteExercise = createAsyncThunk("deleteExercise", async (id) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const { data } = await axios.delete(`https://ishacare.onrender.com/api/exercise/${id}`, config);
  return data;
});

export const editExercise = createAsyncThunk(
  "editExercise",
  async (options) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `https://ishacare.onrender.com/api/exercise/${options.id}`,
      options.fd,
      config
    );
    return data;
  }
);

export const getExerciseDetail = createAsyncThunk(
  "getExerciseDetail",
  async (id) => {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(`https://ishacare.onrender.com/api/exercise/${id}`, config);
    return data;
  }
);

const exerciseSlice = createSlice({
  name: "exerciseSlice",
  initialState: {
    loading: false,
    error: null,
    exercises: null,
    exercise: null,
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetIsUpdated: (state) => {
      state.isUpdated = false;
    },
    resetIsDeleted: (state) => {
      state.isDeleted = false;
    },
    resetIsCreated: (state) => {
      state.isCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllExercises.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.exercises = action.payload.exercises;
    });
    builder.addCase(getAllExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createExercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createExercise.fulfilled, (state, action) => {
      state.loading = false;
      state.exercise = action.payload.exercise;
      state.isCreated = action.payload.success;
    });
    builder.addCase(createExercise.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteExercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteExercise.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
    });
    builder.addCase(deleteExercise.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(editExercise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editExercise.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    });
    builder.addCase(editExercise.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getExerciseDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getExerciseDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.exercise = action.payload.exercise;
    });
    builder.addCase(getExerciseDetail, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default exerciseSlice.reducer;
export const { clearError, resetIsUpdated, resetIsDeleted, resetIsCreated } =
  exerciseSlice.actions;
