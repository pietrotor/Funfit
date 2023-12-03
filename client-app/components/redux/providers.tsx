import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
type TProps = {
  children: React.ReactNode
}
function Providers({ children }: TProps) {
  return <Provider store={store}>{children}</Provider>
}
export default Providers
