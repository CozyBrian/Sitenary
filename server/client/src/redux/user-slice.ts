import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  access_token: string | null;
  refresh_token: string | null;
};

const initialState = (): initialStateType => {
  const token = getAccessToken();

  if (token) {
    return {
      access_token: token,
      refresh_token: "",
    };
  } else {
    return {
      access_token: null,
      refresh_token: null,
    };
  }
};

const userState = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      if (action.payload) {
        state.access_token = action.payload;
      }
    },
    setRefreshToken(state, action: PayloadAction<string | null>) {
      if (action.payload) {
        state.refresh_token = action.payload;
      }
    },
  },
});

export default userState;
