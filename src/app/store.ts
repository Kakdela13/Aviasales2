import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../Components/Filters/filtersSlice";
import tabsReducer from "../Components/Tabs/tabsSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tabs: tabsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
