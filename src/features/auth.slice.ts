import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { auth } from '../config/firebaseConfig'

interface IAuthState {
  user: {
    uid: string;
    email: string;
    password: string;
    isLogged: undefined | boolean;
  }
}

const initialState: IAuthState = {
  user: {
    uid: '',
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
    }

  }
})


export const { checkLogin } = authSlice.actions;

export const authReducer = authSlice.reducer;