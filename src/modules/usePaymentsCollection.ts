import { useState, useEffect } from 'react'
import PaymentData from '../interfaces/PaymentData'
import PaymentSnapshot from '../interfaces/PaymentSnapshot'
import firestoreCollection from './firestoreCollection'

const usePaymentsCollection = (withData = true) => {
  const [collection] = useState(() => firestoreCollection<PaymentData>('payments'))
  const [payments, setPayments] = useState<PaymentSnapshot[]>([])

  useEffect(() => {
    if (!withData) return
    return collection.onSnapshot(
      snapshot => {
        setPayments(snapshot.docs)
      }
    )
  }, [withData, collection])

  const add = (paymentData: PaymentData) => {
    return collection
      .add(paymentData)
      .then(() => console.log('New place added'))
      .catch((error) => console.log(error))
  }

  return { payments, add }
}

export default usePaymentsCollection