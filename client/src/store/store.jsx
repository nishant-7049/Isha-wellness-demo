import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import profileSlice from "./slices/profileSlice";
import EditFrontSlice from "./slices/EditFrontSlice";
import testiSlice from "./slices/testiSlice";
import allUserSlice from "./slices/allUserSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    frontpage: EditFrontSlice,
    testimonial: testiSlice,
    allUsers: allUserSlice,
  },
});

export default store;
