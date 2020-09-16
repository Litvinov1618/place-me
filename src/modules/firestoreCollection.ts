import firebase from './firebase';

const firestoreCollection = <T = firebase.firestore.DocumentData>(collectionPath: string) =>
  firebase.firestore().collection(collectionPath) as firebase.firestore.CollectionReference<T>;

export default firestoreCollection;