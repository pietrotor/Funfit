import IconSelector from '@/components/atoms/IconSelector'
import React from 'react'
export type isActive = 'active' | 'inactive' | 'completed'
export interface Step {
  label: string;
  isActive: isActive;
}

export interface StepperProps {
  steps: Step[];
  title?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, title }) => {
  return (
    <div className='h-full w-full'>
        <div className="flex justify-around w-full py-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative space-x-2 rounded-3xl">
              <span className={`text-lg cursor-pointer font-semibold flex items-center justify-center w-10 h-10 shadow-xl rounded-full ${step.isActive === 'active' ? 'bg-secondary' : step.isActive === 'completed' ? 'bg-primary' : ''} `}
               >
                <IconSelector name='check' width='w-16' height='h-16' color={`${step.isActive === 'inactive' ? 'text-gray-300' : 'text-white'}`}/>
              </span>
              {index < steps.length && (
                <div
                  className={`${step.isActive === 'inactive' ? 'text-gray-500' : step.isActive === 'active' ? 'text-secondary' : 'text-primary'} rounded-full hidden md:block`}
                >
                  {step.label}
                </div>
              )}
            </div>
          ))}
        </div >
    </div>
  )
}

export default Stepper
