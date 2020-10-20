import firebase from './firebase'

const createFirebaseTimestampFromDate = (date: Date) => firebase.firestore.Timestamp.fromDate(date)

export default createFirebaseTimestampFromDate
