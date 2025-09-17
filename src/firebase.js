import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC8dYIqPw_FpuO9_W35WvSYkxGKIxFlUZg",
  authDomain: "investing-up.firebaseapp.com",
  projectId: "investing-up",
  storageBucket: "investing-up.firebasestorage.app",
  messagingSenderId: "652286664183",
  appId: "1:652286664183:web:ce9e6e9f17d5becaf422f2",
  measurementId: "G-JHYQKSYK3M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };