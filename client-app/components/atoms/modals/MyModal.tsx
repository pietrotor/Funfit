/* eslint-disable multiline-ternary */
import { Modal, ModalContent } from '@nextui-org/react'
import React from 'react'
import IconSelector, { TSvgNames } from '../IconSelector'
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
  hideSuccessButton?: boolean
  hideFooter?: boolean
  control?: any
  watch?: any
  reset?: () => void
  handleSubmit?: any
  icon?: TSvgNames
  textColor?: string
  bgIconColor?: string
  colorButon?: string
  hoverButon?: string
  focusButon?: string
  onSubmit?: any
  isForm?: boolean
  radius?: 'sm' | 'md' | 'lg' | 'none' | undefined
  scrollBehavior?: 'inside' | 'outside' | 'normal'
  sheet?: boolean
  placement?:
    | 'auto'
    | 'center'
    | 'top'
    | 'top-center'
    | 'bottom'
    | 'bottom-center'
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
  hideCancelButton = true,
  icon = 'Admin',
  textColor = 'blue-600',
  bgIconColor = 'blue-100',
  colorButon = 'blue-600',
  hoverButon = 'blue-700',
  focusButon = 'blue-500',
  hideSuccessButton = false,
  hideFooter = false,
  scrollBehavior,
  sheet = false,
  placement
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
      scrollBehavior={sheet ? 'normal' : scrollBehavior}
      placement={placement}
      classNames={
        sheet
          ? {
              wrapper: 'items-end px-0 sm:items-center sm:px-4',
              base: 'mb-0 mt-auto max-h-[94dvh] overflow-hidden rounded-b-none sm:my-auto sm:max-h-[90vh] sm:rounded-2xl'
            }
          : undefined
      }
    >
      <ModalContent>
        {close => {
          return (
            <div
              className={`bg-white text-left ${
                sheet
                  ? 'flex max-h-[94dvh] flex-col overflow-hidden sm:max-h-[90vh]'
                  : 'inline-block transform overflow-hidden rounded-lg align-bottom transition-all sm:mt-8 sm:w-full sm:align-middle'
              }`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {(title || message) && (
              <div
                className={`bg-white ${
                  sheet
                    ? 'shrink-0 px-4 pb-2 pt-4'
                    : 'px-2 pb-2 pt-3 sm:mx-8 sm:p-3 sm:pb-2'
                }`}
              >
                <div className={sheet ? 'flex items-center gap-3' : 'sm:flex sm:items-start'}>
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
                                ? 'bg-secondary/25'
                                : 'bg-blue-100'
                    } sm:mx-0 sm:h-10 sm:w-10 ${sheet ? '!mx-0 !h-10 !w-10' : ''}`}
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
                                  ? 'text-secondary-darken'
                                  : 'text-blue-600'
                      }`}
                    />
                  </div>
                  <div className={sheet ? 'text-left' : 'mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'}>
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
                                  ? 'font-amsipro text-lg text-tertiary'
                                  : 'text-blue-600'
                      }`}
                      id="modal-headline"
                    >
                      {title}
                    </h3>
                    {message ? (
                      <div className={sheet ? 'mt-0.5' : 'mt-2'}>
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              )}
              {isForm ? (
                <form
                  className={sheet ? 'flex min-h-0 flex-1 flex-col' : undefined}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className={sheet ? 'min-h-0 flex-1 overflow-y-auto' : undefined}>
                    {children}
                  </div>
                  {!hideFooter && (
                  <div
                    className={
                      sheet
                        ? 'grid shrink-0 grid-cols-2 gap-2 border-t border-stone-100 bg-white px-4 py-3 sm:flex sm:items-center sm:justify-end sm:gap-2 sm:px-6'
                        : 'mt-3 items-center justify-between bg-gray-50 px-8 py-3 sm:flex sm:flex-row-reverse sm:px-6'
                    }
                  >
                    <div className={sheet ? 'contents' : 'md:space-x-3'}>
                      {!hideSuccessButton && (
                        <ButtonComponent
                          typeOf="submit"
                          onClick={handleSubmit}
                          isLoading={loading}
                          showTooltip={false}
                          disabled={successButtonDisabled}
                          className={`inline-flex w-full justify-center rounded-xl border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                            sheet ? 'col-span-2 !h-12 !rounded-xl !text-sm !font-semibold !shadow-none sm:order-3 sm:!h-11 sm:w-auto' : ''
                          } ${
                            color === 'success'
                              ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                              : color === 'warning'
                                ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                                : color === 'error'
                                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                  : color === 'secondary'
                                    ? '!bg-primary-600 text-white hover:!bg-primary-darken focus:ring-primary'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                          }`}
                        >
                          {textSuccessButton}
                        </ButtonComponent>
                      )}
                      <ButtonComponent
                        showTooltip={false}
                        onClick={handleCancel}
                        disabled={loading}
                        className={`${sheet ? `${textBackButton ? '' : 'col-span-2'} order-3 sm:order-2 sm:w-auto` : 'mt-3'} inline-flex w-full justify-center rounded-xl border border-gray-300 px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm ${
                          sheet ? '!h-11 !rounded-xl !border-stone-200 !bg-white !text-sm !font-semibold !text-stone-700 !shadow-none hover:!bg-stone-50' : ''
                        } ${
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
                        typeOf="button"
                        onClick={handleBack}
                        disabled={backButtonDisabled || loading}
                        showTooltip={false}
                        className={`inline-flex w-full justify-center rounded-xl border border-transparent px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm ${
                          sheet ? 'order-2 !h-11 !rounded-xl !border-0 !bg-transparent !text-sm !font-semibold !text-stone-600 !shadow-none hover:!bg-stone-100 sm:order-1 sm:mr-auto' : 'text-white sm:ml-3'
                        } ${
                          color === 'success'
                            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                            : color === 'warning'
                              ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                              : color === 'error'
                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                : 'border-2 border-gray-300 text-gray-500 hover:border-secondary focus:ring-blue-500'
                        }`}
                      >
                        <IconSelector name="arrow-left" />
                        {textBackButton}
                      </ButtonComponent>
                    )}
                  </div>
                  )}
                </form>
              ) : (
                <div>
                  {children}
                  {!hideFooter && (
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
                  )}
                </div>
              )}
            </div>
          )
        }}
      </ModalContent>
    </Modal>
  )
}
