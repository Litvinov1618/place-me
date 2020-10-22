import { QueryDocumentSnapshot } from '@firebase/firestore-types'
import { useEffect, useState } from 'react'
import firestoreCollection from './firestoreCollection'

interface MemberData {
  name: string
  email: string
  number: string
  bookings: []
}

type MembersSnapshot = QueryDocumentSnapshot<MemberData>

const useMembersCollection = (withData = true) => {
  const [collection] = useState(() => firestoreCollection<MemberData>('members'))
  const [members, setMembers] = useState<MembersSnapshot[]>([])

  useEffect(() => {
    if (!withData) return
    return collection.onSnapshot(snapshot => setMembers(snapshot.docs))
  }, [withData, collection])

  const add = (memberData: MemberData) => {
    return collection
      .add(memberData)
      .then(() => console.log('New member added'))
      .catch((error) => {
        console.log(error)
        throw error
      })
  }

  return { members, add }
}

export default useMembersCollection