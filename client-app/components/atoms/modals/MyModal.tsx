import { Modal, ModalContent } from '@nextui-org/react'
import React from 'react'
import IconSelector from '../IconSelector'
import ButtonComponent from '../Button'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  hideCloseButton?: boolean
  isDimissable?: boolean
  color?: 'success' | 'warning' | 'error' | 'information' | 'secondary'
  title: string
  message: string
  handleCancel?: () => void
  handleBack?: () => void
  loading?: boolean
  backButtonDisabled?: boolean
  successButtonDisabled?: boolean
  textSuccessButton?: string
  textCancelButton?: string
  textBackButton?: string
  errorMessage?: string
  hideCancelButton?: boolean
  control?: any
  watch?: any
  reset?: () => void
  handleSubmit?: any
  onSubmit?: any
  isForm?: boolean
  radius?: 'sm' | 'md' | 'lg' | 'none' | undefined
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | 'full'
}

export const MyModal = ({
  isOpen,
  onClose,
  children,
  hideCloseButton = true,
  size = '2xl',
  isDimissable = true,
  radius = 'md',
  color,
  handleBack,
  textSuccessButton = 'Guardar',
  textCancelButton = 'Cancelar',
  textBackButton,
  errorMessage,
  title,
  message,
  loading,
  handleCancel,
  control,
  watch,
  reset,
  onSubmit,
  handleSubmit,
  isForm = true,
  backButtonDisabled = false,
  successButtonDisabled = false,
  hideCancelButton = true
}: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      radius={radius}
      className="w-full"
      hideCloseButton={hideCloseButton}
      size={size}
      isDismissable={isDimissable}
    >
      <ModalContent>
        {close => {
          return (
            <div
              className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom transition-all  sm:mt-8 sm:w-full sm:align-middle"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-2 pb-2 pt-3 sm:mx-8 sm:p-3 sm:pb-2">
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                      color === 'success'
                        ? 'bg-green-100'
                        : color === 'warning'
                          ? 'bg-yellow-100'
                          : color === 'error'
                            ? 'bg-red-100'
                            : color === 'information'
                              ? 'bg-green-100'
                              : color === 'secondary'
                                ? 'bg-secondary'
                                : 'bg-blue-100'
                    } sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    <IconSelector
                      name={
                        color === 'success'
                          ? 'Plus'
                          : color === 'warning'
                            ? 'edit'
                            : color === 'error'
                              ? 'trash'
                              : color === 'information'
                                ? 'eye'
                                : color === 'secondary'
                                  ? 'Cash'
                                  : 'Admin'
                      }
                      width="w-6"
                      height="h-6"
                      className={`${
                        color === 'success'
                          ? 'text-green-600'
                          : color === 'warning'
                            ? 'text-yellow-600'
                            : color === 'error'
                              ? 'text-red-600'
                              : color === 'information'
                                ? 'text-green-600'
                                : color === 'secondary'
                                  ? 'text-lg text-white'
                                  : 'text-blue-600'
                      }`}
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className={`text-lg font-medium leading-6 text-gray-900 ${
                        color === 'success'
                          ? 'text-green-600'
                          : color === 'warning'
                            ? 'text-yellow-600'
                            : color === 'error'
                              ? 'text-red-600'
                              : color === 'information'
                                ? 'text-green-600'
                                : color === 'secondary'
                                  ? 'text-lg text-gray-500'
                                  : 'text-blue-600'
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
              {isForm ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  {children}
                  <div className="justify-between bg-gray-50 px-8 py-3 sm:flex  sm:flex-row-reverse sm:px-6">
                    <div className="md:space-x-3 ">
                      <ButtonComponent
                        typeOf="submit"
                        onClick={handleSubmit}
                        isLoading={loading}
                        showTooltip={false}
                        disabled={successButtonDisabled}
                        className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                          color === 'success'
                            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                            : color === 'warning'
                              ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                              : color === 'error'
                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                : color === 'secondary'
                                  ? 'bg-secondary/100 hover:bg-secondary focus:ring-secondary'
                                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                        }`}
                      >
                        {textSuccessButton}
                      </ButtonComponent>
                      <ButtonComponent
                        showTooltip={false}
                        onClick={handleCancel}
                        disabled={loading}
                        className={`mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm ${
                          color === 'success'
                            ? 'hover:bg-green-100 focus:ring-green-500'
                            : color === 'warning'
                              ? 'hover:bg-yellow-100 focus:ring-yellow-500'
                              : color === 'error'
                                ? 'hover:bg-red-100 focus:ring-red-500'
                                : 'hover:bg-blue-100 focus:ring-blue-500'
                        }`}
                      >
                        {textCancelButton}
                      </ButtonComponent>
                    </div>
                    {textBackButton && (
                      <ButtonComponent
                        typeOf="submit"
                        onClick={handleBack}
                        disabled={backButtonDisabled || loading}
                        showTooltip={false}
                        className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                          color === 'success'
                            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                            : color === 'warning'
                              ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                              : color === 'error'
                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                : 'border-2 border-gray-300 text-lg text-gray-500 hover:border-secondary focus:ring-blue-500'
                        }`}
                      >
                        <IconSelector name="arrow-left" />
                        {textBackButton}
                      </ButtonComponent>
                    )}
                  </div>
                </form>
              ) : (
                <div>
                  {children}
                  <div
                    className={`bg-gray-50 px-8 py-3 sm:flex ${
                      !errorMessage
                        ? 'sm:flex-row-reverse'
                        : 'items-center justify-between'
                    }   sm:px-6`}
                  >
                    {textBackButton && (
                      <ButtonComponent
                        typeOf="submit"
                        onClick={handleBack}
                        isLoading={loading}
                        disabled={backButtonDisabled || loading}
                        showTooltip={false}
                        className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                          color === 'success'
                            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                            : color === 'warning'
                              ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                              : color === 'error'
                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                        }`}
                      >
                        <IconSelector name="arrow-left" />
                        {textBackButton}
                      </ButtonComponent>
                    )}
                    {errorMessage && (
                      <p className="text-sm italic text-red-500">
                        {errorMessage}
                      </p>
                    )}

                    <div className="space-x-0 md:space-x-3">
                      <ButtonComponent
                        typeOf="submit"
                        onClick={handleSubmit}
                        isLoading={loading}
                        showTooltip={false}
                        className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                          color === 'success'
                            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                            : color === 'warning'
                              ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                              : color === 'error'
                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                        }`}
                      >
                        {textSuccessButton}
                      </ButtonComponent>
                      {hideCancelButton && (
                        <ButtonComponent
                          showTooltip={false}
                          onClick={handleCancel}
                          disabled={loading}
                          className={`mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm ${
                            color === 'success'
                              ? 'hover:bg-green-100 focus:ring-green-500'
                              : color === 'warning'
                                ? 'hover:bg-yellow-100 focus:ring-yellow-500'
                                : color === 'error'
                                  ? 'hover:bg-red-100 focus:ring-red-500'
                                  : 'hover:bg-blue-100 focus:ring-blue-500'
                          }`}
                        >
                          {textCancelButton}
                        </ButtonComponent>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </ModalContent>
    </Modal>
  )
}
