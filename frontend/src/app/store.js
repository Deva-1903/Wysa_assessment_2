import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import adReducer from "../features/ads/adSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adReducer,
  },
});
