import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlices";
import profileReducer from "./Slices/ProfileSlice";
import jobApplicationReducer from "./Slices/jobApplicationSlice";
import filterReducer from "./Slices/FilterSlices";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    jobApplication: jobApplicationReducer, 
    filter:filterReducer// 👈 now it will work
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
