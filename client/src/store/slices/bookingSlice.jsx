import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const checkout = createAsyncThunk("createOrder", async (amount) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  const { data } = await axios.post(
    "https://ishacare.onrender.com/api/payment/checkout",
    { amount },
    config
  );
  return data;
});

export const getKey = createAsyncThunk("getKey", async () => {
  const { data } = await axios.get(
    "https://ishacare.onrender.com/api/payment/getKey"
  );
  return data;
});

export const createBooking = createAsyncThunk(
  "createBooking",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "https://ishacare.onrender.com/api/booking/new",
      options,
      config
    );
    return data;
  }
);

export const getAllBookings = createAsyncThunk("getAllBookings", async () => {
  const config = { withCredentials: true };
  const { data } = await axios.get(
    "https://ishacare.onrender.com/api/booking/all",
    config
  );
  return data;
});

export const getPaymentDetail = createAsyncThunk(
  "getPaymentDetail",
  async (id) => {
    const config = { withCredentials: true };
    const { data } = await axios.get(
      `https://ishacare.onrender.com/api/payment/${id}`,
      config
    );
    return data;
  }
);

export const getPaymentDetailForUser = createAsyncThunk(
  "getPaymentDetailForUser",
  async (bookingId) => {
    const config = { withCredentials: true };
    const { data } = await axios.get(
      `https://ishacare.onrender.com/api/payment/user/${bookingId}`,
      config
    );
    return data;
  }
);

export const deleteBooking = createAsyncThunk("deleteBooking", async (id) => {
  const config = { withCredentials: true };
  const { data } = await axios.delete(
    `https://ishacare.onrender.com/api/booking/delete/${id}`,
    config
  );
  return data;
});

export const verifyPayment = createAsyncThunk(
  "verifyPayment",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "https://ishacare.onrender.com/api/payment/verification",
      options,
      config
    );
    return data;
  }
);

export const getBookingDetail = createAsyncThunk(
  "getBookingDetail",
  async (id) => {
    const config = { withCredentials: true };
    const { data } = await axios.get(
      `https://ishacare.onrender.com/api/booking/detail/${id}`,
      config
    );
    return data;
  }
);
export const getBookingDetailForUser = createAsyncThunk(
  "getBookingDetailForUser",
  async (id) => {
    const config = { withCredentials: true };
    const { data } = await axios.get(
      `https://ishacare.onrender.com/api/booking/user/detail/${id}`,
      config
    );
    return data;
  }
);
export const setTherapist = createAsyncThunk(
  "setTherapist",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      "https://ishacare.onrender.com/api/booking/setTherapist",
      options,
      config
    );
    return data;
  }
);

export const setFacilitator = createAsyncThunk(
  "setFacilitator",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      "https://ishacare.onrender.com/api/booking/setFacilitator",
      options,
      config
    );
    return data;
  }
);

export const getBookingForTherapist = createAsyncThunk(
  "getBookingForTherapist",
  async () => {
    const config = { withCredentials: true };
    const { data } = await axios.get(
      "https://ishacare.onrender.com/api/booking/therapist/bookings",
      config
    );
    return data;
  }
);

export const getBookingForFacilitator = createAsyncThunk(
  "getBookingForFacilitator",
  async () => {
    const config = { withCredentials: true };
    const { data } = await axios.get(
      "https://ishacare.onrender.com/api/booking/facilitator/bookings",
      config
    );
    return data;
  }
);

export const setBookingStatus = createAsyncThunk(
  "setBookingStatus",
  async (options) => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `https://ishacare.onrender.com/api/booking/status/${options.id}`,
      { status: options.status },
      config
    );
    return data;
  }
);

export const getUserOrders = createAsyncThunk("getUserOrders", async () => {
  const config = { withCredentials: true };
  const { data } = await axios.get(
    "https://ishacare.onrender.com/api/booking/user/bookings",
    config
  );
  return data;
});

const BookingSlice = createSlice({
  name: "bookingSlice",
  initialState: {
    loading: false,
    error: null,
    order: null,
    orderCreated: false,
    key: null,
    booking: null,
    bookings: null,
    isUpdated: false,
    facUpdated: false,
    therUpdated: false,
    bookingUpdated: false,
    bookingCreated: false,
    paymentVerified: false,
    isBookingDeleted: false,
    isStatusUpdated: false,
    therapistBooking: null,
    facilitatorBooking: null,
    bookingDetails:
      JSON.parse(localStorage.getItem("bookingDetails")) ||
      JSON.parse(localStorage.getItem("bookingDetails") != undefined)
        ? JSON.parse(localStorage.getItem("bookingDetails"))
        : [],
    info: null,
    payment: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateBookingDetails: (state) => {
      state.bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
    },
    resetpayment: (state) => {
      state.payment = null;
    },
    resetOrderCreated: (state) => {
      state.orderCreated = false;
    },
    resetIsBookingDeleted: (state) => {
      state.isBookingDeleted = false;
    },
    resetPaymentVerified: (state) => {
      state.paymentVerified = false;
    },
    clearPayment: (state) => {
      state.payment = null;
    },
    resetIsUpdated: (state) => {
      state.isUpdated = false;
    },
    resetFacUpdated: (state) => {
      state.facUpdated = false;
    },
    resetTherUpdated: (state) => {
      state.therUpdated = false;
    },
    resetBookingUpdated: (state) => {
      state.bookingUpdated = false;
    },
    resetIsStatusUpdated: (state) => {
      state.isStatusUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkout.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
      state.orderCreated = action.payload.success;
    });
    builder.addCase(checkout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getKey.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getKey.fulfilled, (state, action) => {
      state.loading = false;
      state.key = action.payload.key;
    });
    builder.addCase(getKey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createBooking.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.booking = action.payload.booking;
      state.bookingCreated = action.payload.success;
    });
    builder.addCase(createBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllBookings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings = action.payload.bookings;
    });
    builder.addCase(getAllBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPaymentDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPaymentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.payment = action.payload.payment;
    });
    builder.addCase(getPaymentDetail.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getPaymentDetailForUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPaymentDetailForUser.fulfilled, (state, action) => {
      state.loading = false;
      state.payment = action.payload.payment;
    });
    builder.addCase(getPaymentDetailForUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteBooking.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.isBookingDeleted = action.payload.success;
    });
    builder.addCase(deleteBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(verifyPayment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentVerified = action.payload.success;
    });
    builder.addCase(verifyPayment.rejected, (state) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getBookingDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBookingDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.booking = action.payload.booking;
    });
    builder.addCase(getBookingDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getBookingDetailForUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBookingDetailForUser.fulfilled, (state, action) => {
      state.loading = false;
      state.booking = action.payload.booking;
    });
    builder.addCase(getBookingDetailForUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(setTherapist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setTherapist.fulfilled, (state, action) => {
      state.loading = false;
      state.bookingUpdated = action.payload.success;
    });
    builder.addCase(setTherapist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(setFacilitator.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setFacilitator.fulfilled, (state, action) => {
      state.loading = false;
      state.bookingUpdated = action.payload.success;
    });
    builder.addCase(setFacilitator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getBookingForTherapist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBookingForTherapist.fulfilled, (state, action) => {
      state.loading = false;
      state.therapistBooking = action.payload.bookings;
    });
    builder.addCase(getBookingForTherapist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getBookingForFacilitator.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBookingForFacilitator.fulfilled, (state, action) => {
      state.loading = false;
      state.facilitatorBooking = action.payload.bookings;
    });
    builder.addCase(getBookingForFacilitator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(setBookingStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setBookingStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.isStatusUpdated = action.payload.success;
    });
    builder.addCase(setBookingStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUserOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings = action.payload.bookings;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default BookingSlice.reducer;
export const {
  clearError,
  updateBookingDetails,
  resetpayment,
  resetOrderCreated,
  resetIsBookingDeleted,
  resetPaymentVerified,
  clearPayment,
  resetIsUpdated,
  resetTherUpdated,
  resetFacUpdated,
  resetBookingUpdated,
  resetIsStatusUpdated,
} = BookingSlice.actions;
