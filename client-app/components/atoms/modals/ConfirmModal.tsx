import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Trash2
} from 'lucide-react'
import ButtonComponent from '../Button'

type ModalProps = {
  isOpen: boolean
  name?: string
  color?: 'success' | 'warning' | 'error' | 'information'
  message?: string
  confirmText?: string
  cancelText?: string
  title?: string
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

const toneMap = {
  success: {
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-700',
    title: 'text-emerald-800',
    btn: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
    cancelHover: 'hover:bg-emerald-50 focus:ring-emerald-500',
    Icon: CheckCircle2
  },
  warning: {
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-700',
    title: 'text-amber-800',
    btn: 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-500',
    cancelHover: 'hover:bg-amber-50 focus:ring-amber-500',
    Icon: AlertTriangle
  },
  error: {
    iconBg: 'bg-red-50',
    iconText: 'text-red-600',
    title: 'text-red-700',
    btn: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    cancelHover: 'hover:bg-red-50 focus:ring-red-500',
    Icon: Trash2
  },
  information: {
    iconBg: 'bg-primary/10',
    iconText: 'text-primary-600',
    title: 'text-primary-darken',
    btn: 'bg-primary-600 hover:bg-primary-darken focus:ring-primary',
    cancelHover: 'hover:bg-primary/5 focus:ring-primary',
    Icon: Info
  }
}

export const ConfirmModal = ({
  isOpen,
  color = 'information',
  title,
  cancelText,
  onClose,
  confirmText,
  message,
  onConfirm,
  loading
}: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  const handleConfirm = () => {
    onClose()
    onConfirm()
  }

  if (!isMounted || !isOpen) return null

  const tone = toneMap[color] || toneMap.information
  const Icon = tone.Icon

  return createPortal(
    <div className="fixed inset-0 overflow-y-auto" style={{ zIndex: 9000 }}>
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-stone-900/40" />
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block transform overflow-hidden rounded-2xl border border-stone-200 bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${tone.iconBg} sm:mx-0 sm:h-10 sm:w-10`}
              >
                <Icon
                  className={`h-5 w-5 ${tone.iconText}`}
                  strokeWidth={1.75}
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className={`font-amsipro text-lg font-semibold leading-6 ${tone.title}`}
                  id="modal-headline"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-stone-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-stone-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <ButtonComponent
              showTooltip={false}
              isLoading={loading}
              onClick={() => handleConfirm()}
              className={`inline-flex w-full justify-center rounded-xl border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${tone.btn}`}
            >
              {confirmText}
            </ButtonComponent>
            <ButtonComponent
              showTooltip={false}
              onClick={onClose}
              disabled={loading}
              className={`mt-3 inline-flex w-full justify-center rounded-xl border border-stone-200 bg-white px-4 py-2 text-base font-medium text-stone-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm ${tone.cancelHover}`}
            >
              {cancelText}
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
