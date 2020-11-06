import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here 
let firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_JSON_CONFIG)

if (!firebase.apps.length) {
  //  thisfbApp = firebase.initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
}

//firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.database();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();



// export utils/refs
export {
  db,
  auth, googleProvider
}