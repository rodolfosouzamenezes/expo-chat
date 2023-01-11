import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getAuth, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  
};

export const firebase = initializeApp(firebaseConfig);
initializeAuth(firebase, { persistence: getReactNativePersistence(AsyncStorage) });
export const auth = getAuth()