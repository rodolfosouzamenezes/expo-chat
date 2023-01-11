import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { auth } from '../config/firebaseConfig'

interface IUserPayload {
  name: string;
  email: string;
  password: string;
}
interface IAuthState {
  user: {
    uid: string;
    email: string;
    name: string;
    password: string;
    isLogged: undefined | boolean;
  }
}

const initialState: IAuthState = {
  user: {
    uid: '',
    name: '',
    email: '',
    password: '',
    isLogged: undefined,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkLogin: (state = initialState, action: PayloadAction<boolean>) => {
      let user = auth.currentUser;

      if (user) {
        state.user.isLogged = true;
      } else {
        state.user.isLogged = false;
      }
    },
    signUp: (state = initialState, action: PayloadAction<IUserPayload>) => {
      state.user.uid = String(Math.random());
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.isLogged = true;
    },
  }
})


export const { checkLogin, signUp } = authSlice.actions;

export const authReducer = authSlice.reducer;