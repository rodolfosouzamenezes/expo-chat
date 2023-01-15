import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const firebaseConfig = {
  // your config here
};

const firebase = initializeApp(firebaseConfig);

// Asynchronous Data Storage Persistence
initializeAuth(firebase, { persistence: getReactNativePersistence(AsyncStorage) });

const auth = getAuth()

export {
  firebase,
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
}