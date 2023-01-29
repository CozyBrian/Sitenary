import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app-slice";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const action = {
  app: appSlice.actions,
};

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
