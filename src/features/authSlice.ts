import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { auth } from '../config/firebaseConfig'

const initialState = {
  email: '',
  password: '',
  status: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkLogin: (state = initialState, action: PayloadAction<boolean>) => {
      let user = auth.currentUser;

      if(user) {
        return { ...state, state: true }
        
      } else {
        
        return { ...state, state: false }
      }
    }

  }
})


export const { checkLogin } = authSlice.actions;

export default authSlice.reducer