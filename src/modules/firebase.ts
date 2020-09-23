import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'place-me-1b0f9.firebaseapp.com',
  databaseURL: 'https://place-me-1b0f9.firebaseio.com',
  projectId: 'place-me-1b0f9',
  storageBucket: 'place-me-1b0f9.appspot.com',
  messagingSenderId: '44079676404',
  appId: '1:44079676404:web:49577932ca3e89fdba97a1'
}

firebase.initializeApp(firebaseConfig)

export default firebase
