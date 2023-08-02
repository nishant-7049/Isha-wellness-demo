import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const exerciseSlice = createSlice({
  name: "exerciseSlice",
  initialState: {
    loading: false,
    error: null,
    exercises: [],
    exercise: [],
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
    resetisDeleted: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {},
});

export default exerciseSlice.reducer;
export const { clearError, resetIsUpdated, resetisDeleted } =
  exerciseSlice.actions;
