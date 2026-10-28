import React, { SetStateAction, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion
} from 'framer-motion'
import { X } from 'lucide-react'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import SalesReceipt from '@/components/organisms/SalesReceipt'

interface ResponsiveSaleModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: TPointOfSaleData
  setSelectedProducts: React.Dispatch<SetStateAction<TPointOfSaleData>>
  refetch?: () => void
}

function ResponsiveSaleModal({
  isOpen,
  onClose,
  selectedProducts,
  setSelectedProducts,
  refetch
}: ResponsiveSaleModalProps) {
  const [mounted, setMounted] = useState(false)
  const reduceMotion = useReducedMotion()
  const dragControls = useDragControls()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.button
          key="ticket-backdrop"
          type="button"
          aria-label="Cerrar ticket"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          onClick={onClose}
        />
      )}
      {isOpen && (
        <motion.section
          key="ticket-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Recibo de venta"
          className="fixed inset-x-0 bottom-0 z-40 flex h-[92dvh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl md:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', damping: 32, stiffness: 380 }}
          drag="y"
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.45 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 90 || info.velocity.y > 700) onClose()
          }}
        >
          <div
            className="relative flex shrink-0 cursor-grab items-center justify-center pb-2 pt-3 active:cursor-grabbing"
            style={{ touchAction: 'none' }}
            onPointerDown={event => {
              if ((event.target as HTMLElement).closest('button')) return
              dragControls.start(event)
            }}
          >
            <span className="h-1.5 w-12 rounded-full bg-stone-300" />
            <button
              type="button"
              aria-label="Cerrar ticket"
              onClick={onClose}
              className="absolute right-3 top-2 flex h-8 w-8 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
          <div className="min-h-0 flex-1">
            <SalesReceipt
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              refetch={refetch}
              onSaleComplete={onClose}
            />
          </div>
        </motion.section>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default ResponsiveSaleModal
