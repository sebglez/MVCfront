import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCONhOsy-_OiDSJYExneBko4hT_48JZk-M",
  authDomain: "mvcfullstack-192c2.firebaseapp.com",
  projectId: "mvcfullstack-192c2",
  storageBucket: "mvcfullstack-192c2.appspot.com",
  messagingSenderId: "944899078624",
  appId: "1:944899078624:web:bc62f9ba09a85be67d1385",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
