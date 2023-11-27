import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
type Ttoast = 'success' | 'error' | 'loading'

export const showSuccessToast = (message:string, type:Ttoast) => {
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
    default:
      break
  }
}

const ToastComponent: React.FC = () => {
  return (
        <div>
            <Toaster position="bottom-right" toastOptions={{ style: { background: 'white', color: 'black', height: '70px', border: '2px solid #CCE266' } }} />
        </div>
  )
}

export default ToastComponent
