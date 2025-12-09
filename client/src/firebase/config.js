import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace these values with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDhQgoOlomtVIF_56rUMonFqbDxmFlB0nw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "travelguru-7a9db.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "travelguru-7a9db",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "travelguru-7a9db.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "639116008796",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:639116008796:web:e27744031087d4dd3c3599"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

