import firebase from 'firebase';
import 'firebase/storage'; 

const app =firebase.initializeApp({

    apiKey: "AIzaSyDhXPG-FaIO2ZrNtQfqaW7pDMOJ4r3LrtY",
    authDomain: "chat-app-71bd1.firebaseapp.com",
    databaseURL: "https://chat-app-71bd1.firebaseio.com",
    projectId: "chat-app-71bd1",
    storageBucket: "chat-app-71bd1.appspot.com",
    messagingSenderId: "594581396208",
    appId: "1:594581396208:web:b39454a5aab5f71be8c035",
    measurementId: "G-Z8H0RG77ZS"
  
});
export const firebaseDB = app.database();

 export const  storageRef = firebase.storage().ref();