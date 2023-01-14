import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import { authReducer } from "../features/auth.slice";
import { chatReducer } from "../features/chat.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;