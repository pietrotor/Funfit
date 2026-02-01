import { Modal, ModalContent, Progress } from '@nextui-org/react'
import IconSelector from '../IconSelector'

export type ExportModalProps = {
  isOpen: boolean
  onClose: () => void
  status: 'idle' | 'loading' | 'success' | 'error'
  errorMessage?: string
}

export const ExportModal = ({
  isOpen,
  onClose,
  status,
  errorMessage
}: ExportModalProps) => {
  const getStatusContent = () => {
    switch (status) {
      case 'loading':
        return {
          icon: 'Download' as const,
          title: 'Exportando datos...',
          message: 'Por favor espera mientras se genera el archivo Excel',
          bgColor: 'bg-emerald-100',
          iconColor: 'text-emerald-600',
          showProgress: true
        }
      case 'success':
        return {
          icon: 'check' as const,
          title: '¡Exportación completada!',
          message: 'El archivo se ha descargado correctamente',
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600',
          showProgress: false
        }
      case 'error':
        return {
          icon: 'close' as const,
          title: 'Error en la exportación',
          message: errorMessage || 'Ocurrió un error al generar el archivo',
          bgColor: 'bg-red-100',
          iconColor: 'text-red-600',
          showProgress: false
        }
      default:
        return {
          icon: 'Download' as const,
          title: 'Preparando exportación',
          message: 'Iniciando...',
          bgColor: 'bg-gray-100',
          iconColor: 'text-gray-600',
          showProgress: false
        }
    }
  }

  const content = getStatusContent()

  return (
    <Modal
      isOpen={isOpen}
      onClose={status !== 'loading' ? onClose : undefined}
      radius="lg"
      hideCloseButton={status === 'loading'}
      isDismissable={status !== 'loading'}
      size="md"
      classNames={{
        backdrop: 'bg-black/50 backdrop-blur-sm'
      }}
    >
      <ModalContent>
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Icono animado */}
            <div
              className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${content.bgColor} ${
                status === 'loading' ? 'animate-pulse' : ''
              }`}
            >
              {status === 'loading' ? (
                <div className="relative">
                  <IconSelector
                    name="Download"
                    width="w-10"
                    height="h-10"
                    className={`${content.iconColor} animate-bounce`}
                  />
                </div>
              ) : (
                <IconSelector
                  name={content.icon}
                  width="w-10"
                  height="h-10"
                  className={content.iconColor}
                />
              )}
            </div>

            {/* Título */}
            <h3 className="mb-2 text-xl font-bold text-gray-800">
              {content.title}
            </h3>

            {/* Mensaje */}
            <p className="mb-6 text-sm text-gray-500">{content.message}</p>

            {/* Barra de progreso */}
            {content.showProgress && (
              <div className="w-full">
                <Progress
                  size="md"
                  isIndeterminate
                  aria-label="Exportando..."
                  classNames={{
                    base: 'w-full',
                    track: 'bg-emerald-100',
                    indicator: 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  }}
                />
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Procesando ventas...</span>
                </div>
              </div>
            )}

            {/* Botón de cerrar (solo cuando no está cargando) */}
            {status !== 'loading' && (
              <button
                onClick={onClose}
                className={`mt-4 rounded-lg px-6 py-2.5 font-medium text-white transition-all duration-200 ${
                  status === 'success'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
                    : 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600'
                } shadow-lg hover:shadow-xl`}
              >
                {status === 'success' ? 'Cerrar' : 'Intentar de nuevo'}
              </button>
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ExportModal
