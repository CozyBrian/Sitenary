import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  selectedSite: string | null;
};

const initialState: initialStateType = {
  selectedSite: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedSite(state, action: PayloadAction<string>) {
      state.selectedSite = action.payload;
    },
  },
});

export default appSlice;
