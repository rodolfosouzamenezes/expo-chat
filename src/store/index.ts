import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import { authReducer } from "../features/auth.slice";
import { chatReducer } from "../features/chat.slice";
import { toastReducer } from "../features/toast.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    toast: toastReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;