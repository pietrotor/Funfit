import React from 'react'
import { Button, Tooltip } from '@nextui-org/react'
import clsx from 'clsx'

type typeButtons = 'edit' | 'delete' | 'submit' | 'history' | 'eye' | 'default'

type TButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: typeButtons
  disabled?: boolean
  className?: string
  showTooltip?: boolean
  tooltipText?: string
  isLoading?: boolean
  isIconOnly?: boolean
  typeOf?: 'button' | 'submit' | 'reset' | undefined
}

const tooltipColor: Record<typeButtons, string> = {
  edit: 'text-primary-600',
  delete: 'text-red-600',
  submit: 'text-emerald-700',
  history: 'text-stone-600',
  eye: 'text-secondary-darken',
  default: 'text-primary-600'
}

const ButtonComponent = ({
  children,
  onClick,
  type = 'default',
  typeOf,
  disabled,
  className,
  showTooltip = true,
  isLoading = false,
  isIconOnly = false,
  tooltipText = ''
}: TButtonProps) => {
  const ghostClass = clsx(
    'rounded-lg bg-stone-100 p-1.5 text-stone-600 transition-colors hover:bg-stone-200 hover:text-tertiary',
    disabled && 'cursor-not-allowed opacity-50',
    className
  )

  if (showTooltip) {
    return (
      <Tooltip content={tooltipText} className={tooltipColor[type]}>
        <button
          type="button"
          className={ghostClass}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      </Tooltip>
    )
  }

  return (
    <Button
      type={typeOf}
      isLoading={isLoading}
      className={ghostClass}
      onClick={onClick}
      disabled={disabled}
      isIconOnly={isIconOnly}
    >
      {children}
    </Button>
  )
}

export default ButtonComponent
