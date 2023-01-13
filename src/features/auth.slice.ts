import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { auth, firebase } from '../config/firebaseConfig'
import { set, ref } from "firebase/database";
import { useDispatch } from 'react-redux';

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
    isLogged: undefined | boolean;
  }
}

const initialState: IAuthState = {
  user: {
    uid: '',
    name: '',
    email: '',
    isLogged: undefined,
  },
}
export const database = getDatabase(firebase);

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
    changeUid: (state = initialState, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    signUp: (state = initialState, action: PayloadAction<IUserPayload>) => {
      const { name, email, password } = action.payload;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          set(ref(database, 'users/' + user.uid), {
            name,
          });
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              console.log('message:', error.message);
              console.log('Já existe uma conta com este email')
              break
            case 'auth/invalid-email':
              console.log('message:', error.message);
              console.log('Email inválido')
              break
            case 'auth/operation-not-allowed':
              console.log('message:', error.message);
              console.log('Tente novamente mais tarde')
              break
            case 'auth/weak-password':
              console.log('message:', error.message);
              console.log('Senha muito fraca')
              break
            default:
              console.log('error:', error.code);
              console.log('message:', error.message);
              break
          }
        });


      if (auth.currentUser.uid) {

        state.user = {
          uid: auth.currentUser.uid,
          name,
          email,
          isLogged: true,
        };
      }

    },
  }
})


export const { checkLogin, signUp, changeUid } = authSlice.actions;

export const authReducer = authSlice.reducer;