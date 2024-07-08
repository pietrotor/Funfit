import { Modal, ModalContent } from '@nextui-org/react'
import isBusinessOpen, {
  DAYS_OF_WEEK,
  SCHEDULE
} from '@/helpers/business-state'
import { useState } from 'react'

const ScheduleModal = () => {
  const [isOpen, setIsOpen] = useState(!isBusinessOpen())
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalContent>
        <div className="p-4">
          <h3 className="text-primary">
            En este momento no estamos atendiendo
          </h3>
          <p>
            Lamentamos informarte que nuestro ecommerce está cerrado
            temporalmente para mantenimiento.
          </p>
          <p className="mb-1 mt-2 font-semibold">Nuestros horarios</p>
          <div className="space-y-4 rounded-md bg-blue-100 p-3">
            {DAYS_OF_WEEK.map((day, index) => (
              <div key={day} className="flex items-center justify-between">
                <p className="text-sm font-bold">{day}</p>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  {SCHEDULE[index + 1]?.map((item, idx) => (
                    <p key={idx} className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      {item.open}-{item.close}{' '}
                    </p>
                  ))}
                  {!SCHEDULE[index + 1] && <p>Cerrado</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export { ScheduleModal }
