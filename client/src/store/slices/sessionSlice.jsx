import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createSession = createAsyncThunk(
  "createSession",
  async (sessionData) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "https://ishacare.onrender.com/api/session/new",
      sessionData,
      config
    );
    return data;
  }
);

export const getSession = createAsyncThunk("getSession", async (id) => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.get(
    `https://ishacare.onrender.com/api/session/${id}`,
    config
  );
  return data;
});

export const setOutcomeReason = createAsyncThunk(
  "setOutcomeReason",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `https://ishacare.onrender.com/api/session/${options.token}`,
      options.data,
      config
    );
    return data;
  }
);
export const setOutcomeReasonForThearpist = createAsyncThunk(
  "setOutcomeReasonForThearpist",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `https://ishacare.onrender.com/api/session/therapist/${options.sessionId}`,
      options.data,
      config
    );
    return data;
  }
);
export const setOutcomeReasonForFacilitator = createAsyncThunk(
  "setOutcomeReasonForFacilitator",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `https://ishacare.onrender.com/api/session/facilitator/${options.sessionId}`,
      options.data,
      config
    );
    return data;
  }
);

const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState: {
    loading: false,
    error: null,
    sessions: [],
    isOutcomeReasonUpdated: false,
    isCreated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetIsCreated: (state) => {
      state.isCreated = false;
    },
    resetIsOutcomeReasonUpdated: (state) => {
      state.isOutcomeReasonUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSession.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreated = action.payload.success;
    });
    builder.addCase(createSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions = action.payload.sessions;
    });
    builder.addCase(getSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(setOutcomeReason.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setOutcomeReason.fulfilled, (state, action) => {
      state.loading = false;
      state.isOutcomeReasonUpdated = action.payload.success;
    });
    builder.addCase(setOutcomeReason.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(setOutcomeReasonForThearpist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setOutcomeReasonForThearpist.fulfilled, (state, action) => {
      state.loading = false;
      state.isOutcomeReasonUpdated = action.payload.success;
    });
    builder.addCase(setOutcomeReasonForThearpist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(setOutcomeReasonForFacilitator.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      setOutcomeReasonForFacilitator.fulfilled,
      (state, action) => {
        state.loading = false;
        state.isOutcomeReasonUpdated = action.payload.success;
      }
    );
    builder.addCase(
      setOutcomeReasonForFacilitator.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
  },
});

export const { clearError, resetIsOutcomeReasonUpdated } = sessionSlice.actions;
export default sessionSlice.reducer;
