import React from 'react'
import IconSelector from '@/components/atoms/IconSelector'
export type isActive = 'active' | 'inactive' | 'completed'
export interface Step {
  label: string
  isActive: isActive
}

export interface StepperProps {
  steps: Step[]
  title?: string
}

const Stepper: React.FC<StepperProps> = ({ steps, title }) => {
  return (
    <div className="h-full w-full border-b-1">
      <div className="flex w-full justify-around py-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center space-x-2 rounded-3xl"
          >
            <span
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-lg font-semibold shadow-xl ${
                step.isActive === 'active' ? 'bg-secondary' : step.isActive === 'completed' ? 'bg-primary' : ''
              } `}
            >
              <IconSelector
                name="check"
                width="w-16"
                height="h-16"
                color={`${
                  step.isActive === 'inactive' ? 'text-gray-300' : 'text-white'
                }`}
              />
            </span>
            {index < steps.length && (
              <div
                className={`${
                  step.isActive === 'inactive' ? 'text-gray-500' : step.isActive === 'active' ? 'text-secondary' : 'text-primary'
                } hidden rounded-full md:block`}
              >
                {step.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stepper
