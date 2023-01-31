import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';

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
const persistence = getReactNativePersistence(AsyncStorage);
initializeAuth(firebase, { persistence });
export const auth = getAuth();

// Firestore Database
export const db = getFirestore(firebase);

// Storage
export const storage = getStorage(firebase);
