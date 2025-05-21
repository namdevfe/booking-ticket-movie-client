import { AppStore } from '@/store'
import { useStore } from 'react-redux'

const useAppStore = useStore.withTypes<AppStore>()

export default useAppStore
