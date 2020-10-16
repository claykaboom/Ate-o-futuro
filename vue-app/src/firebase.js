import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
alert(process.env.VUE_APP_FIREBASE_JSON_CONFIG)
let firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_JSON_CONFIG)
alert(firebaseConfig)
console.log(firebaseConfig)

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}