'use client'
import { AppStore, makeStore } from '@/store'
import { getProfile } from '@/store/slices/auth-slice'
import { useRef } from 'react'
import { Provider } from 'react-redux'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>(undefined)

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    storeRef.current.dispatch(getProfile())
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider
