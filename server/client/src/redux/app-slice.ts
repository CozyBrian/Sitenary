import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  selectedSite: string | null;
  addSiteModalOpen: boolean;
  isAuthenticated: boolean;
  isSiteDataEmpty: boolean;
  isDrawerOpen: boolean;
};

const initialState: initialStateType = {
  selectedSite: null,
  addSiteModalOpen: false,
  isAuthenticated: localStorage.getItem("accessToken") !== null,
  isSiteDataEmpty: false,
  isDrawerOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedSite(state, action: PayloadAction<string>) {
      state.selectedSite = action.payload;
    },
    setAddSiteModalOpen(state, action: PayloadAction<boolean>) {
      state.addSiteModalOpen = action.payload;
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setIsSiteDataEmpty(state, action: PayloadAction<boolean>) {
      state.isSiteDataEmpty = action.payload;
    },
    setIsDrawerOpen(state, action: PayloadAction<boolean>) {
      state.isDrawerOpen = action.payload;
    },
  },
});

export default appSlice;
