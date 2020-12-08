import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCDvNgcZJQF90v602_WfzEYWmKRTi3ZDOw",
  authDomain: "todo-app-e02ec.firebaseapp.com",
  databaseURL: "https://todo-app-e02ec.firebaseio.com",
  projectId: "todo-app-e02ec",
  storageBucket: "todo-app-e02ec.appspot.com",
  messagingSenderId: "940732902147",
  appId: "1:940732902147:web:a13bde6248a7262c631736",
  measurementId: "G-VFP5FE0X9K"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebaseApp.auth();
  const db = firebaseApp.firestore();
  export {db,auth};