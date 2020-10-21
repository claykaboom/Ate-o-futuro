import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here 
let firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_JSON_CONFIG)
 
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.database()
const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider();
 
// export utils/refs
export {
  db,
  auth ,googleProvider
}