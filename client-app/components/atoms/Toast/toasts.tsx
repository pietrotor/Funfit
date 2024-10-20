import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
type Ttoast = 'success' | 'error' | 'loading' | 'warning'

export const showSuccessToast = (message: string, type: Ttoast) => {
  switch (type) {
    case 'success':
      toast.success(message, { duration: 4000 })
      break
    case 'error':
      toast.error(message, { duration: 4000 })
      break
    case 'loading':
      toast.loading(message, { duration: 4000 })
      break
    case 'warning':
      toast(message, { duration: 4000 })
      break
    default:
      break
  }
}

const ToastComponent: React.FC = () => {
  return (
    <Toaster
      position="bottom-right"
      containerStyle={{
        zIndex: '99999 !important'
      }}
      toastOptions={{
        style: {
          background: 'white',
          color: 'black',
          height: '70px',
          fontWeight: 600,
          border: '2px solid #CCE266',
          zIndex: '99999 !important'
        },
        error: {
          style: {
            border: '2px solid red',
            color: 'red',
            fontWeight: 600
          }
        }
      }}
    />
  )
}

export default ToastComponent
