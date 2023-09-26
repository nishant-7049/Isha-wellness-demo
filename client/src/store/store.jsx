import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import profileSlice from "./slices/profileSlice";
import EditFrontSlice from "./slices/EditFrontSlice";
import testiSlice from "./slices/testiSlice";
import allUserSlice from "./slices/allUserSlice";
import exerciseSlice from "./slices/exerciseSlice";
import BookingSlice from "./slices/bookingSlice";
import packageSlice from "./slices/packageSlice";
import treatmentSlice from "./slices/treatmentSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    frontpage: EditFrontSlice,
    testimonial: testiSlice,
    allUsers: allUserSlice,
    exercise: exerciseSlice,
    booking: BookingSlice,
    package: packageSlice,
    treatment: treatmentSlice,
  },
});

export default store;
