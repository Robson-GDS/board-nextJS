import firebase from "firebase/app";
import 'firebase/firestore';

let firebaseConfig = {
  apiKey: "AIzaSyAL6LQtFmv7n60ZtbtHFfMBnFdo9TLkYWo",
  authDomain: "boardapp-70f3e.firebaseapp.com",
  projectId: "boardapp-70f3e",
  storageBucket: "boardapp-70f3e.appspot.com",
  messagingSenderId: "278551278617",
  appId: "1:278551278617:web:e5f92f41294a2d6dc22688",
  measurementId: "G-8ZMF6ZMLJM"
};

// Initialize Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;