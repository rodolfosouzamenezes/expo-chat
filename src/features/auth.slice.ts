import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebase } from '../config/firebaseConfig'
import { getDatabase, set, ref, get } from "firebase/database";

interface IUserPayload {
  uid: string;
  name: string;
  email: string;
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
const database = getDatabase(firebase);

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
    changeUser: (state = initialState, action: PayloadAction<IUserPayload>) => {
      state.user = { ...action.payload, isLogged: true }
    },
    // signUp: (state = initialState, action: PayloadAction<IUserPayload>) => {
    //   const { name, email, password } = action.payload;

    //   createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //       const user = userCredential.user;

    //       set(ref(database, 'users/' + user.uid), {
    //         name,
    //       });
    //     })
    //     .catch((error) => {
    //       switch (error.code) {
    //         case 'auth/email-already-in-use':
    //           console.log('message:', error.message);
    //           console.log('Já existe uma conta com este email')
    //           break
    //         case 'auth/invalid-email':
    //           console.log('message:', error.message);
    //           console.log('Email inválido')
    //           break
    //         case 'auth/operation-not-allowed':
    //           console.log('message:', error.message);
    //           console.log('Tente novamente mais tarde')
    //           break
    //         case 'auth/weak-password':
    //           console.log('message:', error.message);
    //           console.log('Senha muito fraca')
    //           break
    //         default:
    //           console.log('error:', error.code);
    //           console.log('message:', error.message);
    //           break
    //       }
    //     });

    //   if (auth.currentUser.uid) {
    //     state.user = {
    //       uid: auth.currentUser.uid,
    //       name,
    //       email,
    //       isLogged: true,
    //     };
    //   }



    // },
    // signIn: (state = initialState, action: PayloadAction<{ email: string; password: string; }>) => {
    //   const { email, password } = action.payload;

    //   signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //       const user = userCredential.user;
    //       get(ref(database, 'users/' + user.uid + '/name'))
    //         .then(console.log);
    //     })
    //     .catch((error) => {
    //       switch (error.code) {
    //         case 'auth/user-disabled':
    //           console.log('message:', error.message);
    //           console.log('Usuário desabilitado')
    //           break
    //         case 'auth/invalid-email':
    //           console.log('message:', error.message);
    //           console.log('Email inválido')
    //           break
    //         case 'auth/wrong-password':
    //           console.log('message:', error.message);
    //           console.log('Email e/ou senha inválidos')
    //           break
    //         case 'auth/user-not-found':
    //           console.log('message:', error.message);
    //           console.log('Email e/ou senha inválidos')
    //           break
    //         default:
    //           console.log('error:', error.code);
    //           console.log('message:', error.message);
    //           break
    //       }
    //     });

    //   // if (auth.currentUser === email) {


    //   //   state.user = {
    //   //     uid: auth.currentUser.uid,
    //   //     name: 'names',
    //   //     email,
    //   //     isLogged: true,
    //   //   };
    //   // }

    // },
  }
})


export const { checkLogin, changeUser } = authSlice.actions;

export const authReducer = authSlice.reducer;