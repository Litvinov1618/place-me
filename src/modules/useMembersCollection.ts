import { useEffect, useState } from 'react'
import firestoreCollection from './firestoreCollection'
import MemberData from '../interfaces/MemberData'
import MembersSnapshot from '../interfaces/MembersSnapshot'

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
      .then((docRef) => {
        console.log('New member added')
        return docRef.id
      })
      .catch((error) => {
        console.log(error)
        throw error
      })
  }

  return { members, add }
}

export default useMembersCollection