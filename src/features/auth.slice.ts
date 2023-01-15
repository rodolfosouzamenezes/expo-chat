import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { auth } from '../config/firebase';

interface IAuthState {
  user: {
    uid: string;
    email: string;
    name: string;
  }
  isLogged: undefined | boolean;
}

const initialState: IAuthState = {
  user: {
    uid: undefined,
    name: undefined,
    email: undefined,
  },
  isLogged: undefined,
}

interface IUserPayload {
  uid: string;
  name: string;
  email: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeIsLogged: (state = initialState, action: PayloadAction<boolean>) => {
      state = {
        user: { ...state.user },
        isLogged: action.payload
      }
    },
    login: (state = initialState, action: PayloadAction<IUserPayload>) => {
      state.user = {
        email: action.payload.email,
        name: action.payload.name,
        uid: action.payload.uid
      }
      state.isLogged = true
    },
    logout: (state = initialState) => {
      auth.signOut()
      state.user = initialState.user;
      state.isLogged = false;
    },
  }
})

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
