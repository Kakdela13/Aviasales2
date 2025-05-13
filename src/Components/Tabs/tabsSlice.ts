import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTabsProps } from "../../TypeScript/TypeScript";

interface TabsState {
  tab: TTabsProps;
}

const initialState: TabsState = {
  tab: "cheap",
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<TTabsProps>) {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = tabsSlice.actions;
export default tabsSlice.reducer;
