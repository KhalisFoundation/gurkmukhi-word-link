// Import the functions you need from the SDKs you need
import firebase from 'firebase';

const API_KEY = 'AIzaSyAxeQSmufN-0kiAqfQnNzw4jFrz93IrfKo';
const AUTH_DOMAIN = 'sikh-games.firebaseapp.com';
const PROJECT_ID = 'sikh-games';
const STORAGE_BUCKET = 'sikh-games.appspot.com';
const MESSAGING_SENDER_ID = '370328077829';
const APP_ID = '1:370328077829:web:2f0c04971b989c52bf3e6c';
const MEASUREMENT_ID = 'G-G5D0PLV9PG';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth, firebase };
