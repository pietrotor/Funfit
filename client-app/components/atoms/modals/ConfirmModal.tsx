import IconSelector, { TSvgNames } from '../IconSelector'
import ButtonComponent from '../Button'

type ModalProps = {
  isOpen: boolean
  name?: TSvgNames
  color?: 'success' | 'warning' | 'error' | 'information'
  message?: string
  confirmText?: string
  cancelText?: string
  title?: string
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

export const ConfirmModal = ({
  isOpen,
  color,
  name,
  title,
  cancelText,
  onClose,
  confirmText,
  message,
  onConfirm,
  loading
}: ModalProps) => {
  const handleConrfirm = () => {
    onClose()
    onConfirm()
  }
  return (
    <div
      className={`${isOpen ? 'fixed' : 'hidden'} inset-0 z-50 overflow-y-auto`}
    >
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                  color === 'success' ? 'bg-green-100' : color === 'warning' ? 'bg-yellow-100' : color === 'error' ? 'bg-red-100' : 'bg-blue-100'
                } sm:mx-0 sm:h-10 sm:w-10`}
              >
                <IconSelector
                  name={
                    color === 'success' ? 'Box' : color === 'warning' ? 'Boxes' : color === 'error' ? 'trash' : 'Admin'
                  }
                  width="w-6"
                  height="h-6"
                  className={`${
                    color === 'success' ? 'text-green-600' : color === 'warning' ? 'text-yellow-600' : color === 'error' ? 'text-red-600' : 'text-blue-600'
                  }`}
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className={`text-lg font-medium leading-6 text-gray-900 ${
                    color === 'success' ? 'text-green-600' : color === 'warning' ? 'text-yellow-600' : color === 'error' ? 'text-red-600' : 'text-blue-600'
                  }`}
                  id="modal-headline"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <ButtonComponent
              showTooltip={false}
              isLoading={loading}
              onClick={() => handleConrfirm()}
              className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                color === 'success' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : color === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500' : color === 'error' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {confirmText}
            </ButtonComponent>
            <ButtonComponent
              showTooltip={false}
              onClick={onClose}
              disabled={loading}
              className={`mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm ${
                color === 'success' ? 'hover:bg-green-100 focus:ring-green-500' : color === 'warning' ? 'hover:bg-yellow-100 focus:ring-yellow-500' : color === 'error' ? 'hover:bg-red-100 focus:ring-red-500' : 'hover:bg-blue-100 focus:ring-blue-500'
              }`}
            >
              {cancelText}
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  )
}
