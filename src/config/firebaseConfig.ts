import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  
};

export const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);