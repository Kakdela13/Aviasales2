import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allOptions, TFilter } from "../../TypeScript/TypeScript";

interface FiltersState {
  filters: TFilter[];
}

const initialState: FiltersState = {
  filters: ["ALL"],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filteredCheck(state, action: PayloadAction<TFilter>) {
      const filter = action.payload;
      if (filter === "ALL") {
        if (state.filters.includes(filter)) {
          state.filters = [];
        } else {
          state.filters = [...allOptions];
        }
      }

      if (state.filters.includes(filter)) {
        state.filters = state.filters.filter((f) => f !== filter);
      } else {
        state.filters = state.filters.filter((f) => f !== "ALL");
        state.filters.push(filter);
      }
      if (state.filters.length === allOptions.length - 1) {
        state.filters = [...allOptions];
      }
    },
  },
});

export const { filteredCheck } = filtersSlice.actions;
export default filtersSlice.reducer;
