import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPatientMeterData = createAsyncThunk(
  "getPatientMeterData",
  async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.get(
      "https://ishacare.onrender.com/api/dashboard/admin/patientMeter",
      config
    );
    return data;
  }
);

export const getCentreData = createAsyncThunk("getCentreData", async () => {
  const config = {
    withCredentials: true,
  };
  const { data } = await axios.get(
    "https://ishacare.onrender.com/api/dashboard/admin/centreData",
    config
  );
  return data;
});

export const getTherapistPerformance = createAsyncThunk(
  "getTherapistPerformance",
  async () => {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(
      "https://ishacare.onrender.com/api/dashboard/therapist/performance",
      config
    );
    return data;
  }
);
export const getFacilitatorPerformance = createAsyncThunk(
  "getFacilitatorPerformance",
  async () => {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(
      "https://ishacare.onrender.com/api/dashboard/facilitator/performance",
      config
    );
    return data;
  }
);

export const getDropoutsForTherapist = createAsyncThunk(
  "getDropoutsForTherapist",
  async () => {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(
      "https://ishacare.onrender.com/api/dashboard/therapist/dropout",
      config
    );
    return data;
  }
);
export const getDropoutsForFacilitator = createAsyncThunk(
  "getDropoutsForFacilitator",
  async () => {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(
      "https://ishacare.onrender.com/api/dashboard/facilitator/dropout",
      config
    );
    return data;
  }
);

export const getSessionsForTherapist = createAsyncThunk(
  "getSesssionsForTherapist",
  async () => {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(
      "https://ishacare.onrender.com/api/dashboard/therapist/sessions",
      config
    );
    return data;
  }
);
export const getSessionsForFacilitator = createAsyncThunk(
  "getSessionsForFacilitator",
  async () => {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(
      "https://ishacare.onrender.com/api/dashboard/facilitator/sessions",
      config
    );
    return data;
  }
);
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    patientsData: [],
    centreData: [],
    dropouts: [],
    therapistSessions: [],
    facilitatorSessions: [],
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatientMeterData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPatientMeterData.fulfilled, (state, action) => {
      state.loading = false;
      state.patientsData = action.payload.patientsData;
    });
    builder.addCase(getPatientMeterData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getCentreData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCentreData.fulfilled, (state, action) => {
      state.loading = false;
      state.centreData = action.payload.bookings;
    });
    builder.addCase(getCentreData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTherapistPerformance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTherapistPerformance.fulfilled, (state, action) => {
      state.loading = false;
      state.patientsData = action.payload.bookings;
    });
    builder.addCase(getTherapistPerformance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getFacilitatorPerformance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFacilitatorPerformance.fulfilled, (state, action) => {
      state.loading = false;
      state.patientsData = action.payload.bookings;
    });
    builder.addCase(getFacilitatorPerformance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getDropoutsForTherapist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDropoutsForTherapist.fulfilled, (state, action) => {
      state.loading = false;
      state.dropouts = action.payload.bookings;
    });
    builder.addCase(getDropoutsForTherapist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getDropoutsForFacilitator.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDropoutsForFacilitator.fulfilled, (state, action) => {
      state.loading = false;
      state.dropouts = action.payload.bookings;
    });
    builder.addCase(getDropoutsForFacilitator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getSessionsForTherapist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSessionsForTherapist.fulfilled, (state, action) => {
      state.loading = false;
      state.therapistSessions = action.payload.sessions;
    });
    builder.addCase(getSessionsForTherapist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getSessionsForFacilitator.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSessionsForFacilitator.fulfilled, (state, action) => {
      state.loading = false;
      state.facilitatorSessions = action.payload.sessions;
    });
    builder.addCase(getSessionsForFacilitator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default dashboardSlice.reducer;
export const { clearError } = dashboardSlice.actions;
