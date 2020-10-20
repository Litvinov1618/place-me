import firebase from './firebase'

const createFirebaseNowTimestamp = () => firebase.firestore.Timestamp.now()

export default createFirebaseNowTimestamp
