import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { hintsApi } from "./services/hintsApi";

export const store = configureStore({
  reducer: {
    [hintsApi.reducerPath]: hintsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hintsApi.middleware),
});

setupListeners(store.dispatch);
