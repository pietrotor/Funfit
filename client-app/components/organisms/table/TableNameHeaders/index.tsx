import { Button } from '@nextui-org/react'
import React from 'react'

type TableNameHeadersProps = {
  title: string | React.ReactNode
  color?: 'light' | 'dark'
  onUpClick?: () => void
  onDownClick?: () => void
  isUpPress?: boolean
  isDownPress?: boolean
}
const TableNameHeaders = ({
  title,
  color = 'light',
  onUpClick,
  onDownClick,
  isUpPress = false,
  isDownPress = false
}: TableNameHeadersProps) => {
  return (
    <th
      className={
        'max-w-sm border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase' +
        (color === 'light'
          ? 'border-sky-100 !bg-sky-500 text-center font-bold text-white'
          : 'text-blue-white border-blue-500 bg-primary-darken')
      }
    >
      {title}
      {onUpClick && (
        <Button onClick={onUpClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${isUpPress ? 'h-4 w-4' : 'h-3 w-3'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      )}
      {onDownClick && (
        <Button onClick={onDownClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${isDownPress ? 'h-4 w-4' : 'h-3 w-3'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      )}
    </th>
  )
}

export default TableNameHeaders
