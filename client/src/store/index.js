import { configureStore } from "@reduxjs/toolkit";
import travelReducer from "./slices/travelSlice";

export const store = configureStore({
  reducer: { travel: travelReducer },
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});
