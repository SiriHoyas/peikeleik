import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../slice/playerSlice";

export const store = configureStore({
  reducer: {
    players: playerReducer,
  },
});
