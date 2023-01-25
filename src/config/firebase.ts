import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth
} from 'firebase/auth';

// Initialize Firebase configuration using information from .env file
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  databaseURL: Constants.manifest.extra.databaseURL,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  measurementId: Constants.manifest.extra.measurementId,
};
const firebase = initializeApp(firebaseConfig);

// Asynchronous Auth Data Storage Persistence
initializeAuth(firebase, { persistence: getReactNativePersistence(AsyncStorage) });
export const auth = getAuth() 

// Firestore Database
export const db = getFirestore(firebase)

export {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
}