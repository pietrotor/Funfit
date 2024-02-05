import React from 'react'

import { Button, Tooltip } from '@nextui-org/react'

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
  typeOf?: 'button' | 'submit' | 'reset' | undefined
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
  tooltipText = ''
}: TButtonProps) => {
  const getTooltipId = () => {
    return tooltipText ? `tooltip-${type}` : ''
  }

  const getColor = (type: typeButtons) => {
    switch (type) {
      case 'edit':
        return 'primary'
      case 'delete':
        return 'danger'
      case 'submit':
        return 'success'
      case 'history':
        return 'blue-500'
      case 'eye':
        return 'secondary'
      default:
        return 'primary'
    }
  }
  return (
    <>
      {showTooltip ? (
        <Tooltip content={tooltipText} className={`text-${getColor(type)}`}>
          <button
            id={getTooltipId()}
            className={`rounded bg-gray-100 p-1 ${className} `}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
        </Tooltip>
      ) : (
        < Button
          type={typeOf}
          isLoading={isLoading}
          id={getTooltipId()}
          className={`rounded bg-gray-100 p-1 ${className} ${disabled && 'cursor-not-allowed'} `}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </Button>
      )}
    </>
  )
}
export default ButtonComponent
