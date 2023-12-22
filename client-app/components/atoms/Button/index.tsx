import React from 'react'

import { Tooltip } from '@nextui-org/react'

type typeButtons = 'edit' | 'delete' | 'submit' | 'history' | 'eye' | 'default'

type TButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: typeButtons
  disabled?: boolean
  className?: string
  showTooltip?: boolean
  tooltipText?: string
}

const ButtonComponent = ({
  children,
  onClick,
  type = 'default',
  disabled,
  className,
  showTooltip = true,
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
        return 'dark'
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
        <button
          id={getTooltipId()}
          className={`rounded bg-gray-100 p-1 ${className} `}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  )
}
export default ButtonComponent
