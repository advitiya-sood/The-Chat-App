import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC0OFcKHSfyIU2hMivQFv1w_Z2zurNmP98",
    authDomain: "chatapp-120ef.firebaseapp.com",
    projectId: "chatapp-120ef",
    storageBucket: "chatapp-120ef.appspot.com",
    messagingSenderId: "344943307439",
    appId: "1:344943307439:web:e4840a0664ee03a067025a",
    measurementId: "G-JLHJ368XMB"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const googleProvider=new firebase.auth.GoogleAuthProvider();

  export {auth,googleProvider};
  export default db;