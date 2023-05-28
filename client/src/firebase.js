 import { initializeApp } from "firebase/app"
 import { getAuth, GoogleAuthProvider} from "firebase/auth";

 const firebaseConfig = {
  apiKey: "AIzaSyCznmCT9cgcNLcA94s8FpIa2V-vyTBqLp8",
  authDomain: "ecommerce-82d33.firebaseapp.com",
  projectId: "ecommerce-82d33",
  storageBucket: "ecommerce-82d33.appspot.com",
  messagingSenderId: "977082123243",
  appId: "1:977082123243:web:5dbeef89bb5cb4363c0fae"
};
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
// export const sendSignInLink = sendSignInLinkToEmail
export const googleAuthprovider = new GoogleAuthProvider();