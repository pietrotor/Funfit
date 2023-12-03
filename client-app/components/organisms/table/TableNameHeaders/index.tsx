import { Button } from '@nextui-org/react'
import React from 'react'

type TableNameHeadersProps = {
    title: string | React.ReactNode;
    color?: 'light' | 'dark';
    onUpClick?: () => void;
    onDownClick?: () => void;
    isUpPress?: boolean;
    isDownPress?: boolean;
}
const TableNameHeaders = ({ title, color = 'light', onUpClick, onDownClick, isUpPress = false, isDownPress = false }: TableNameHeadersProps) => {
  return (
        <th
        className={
          'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 max-w-sm font-semibold text-left' +
          (color === 'light'
            ? '!bg-sky-500 text-white text-center font-bold border-sky-100'
            : 'bg-primary-darken text-blue-white border-blue-500')
        }
      >
        {title}
        {
          onUpClick && (
            <Button
              onClick={onUpClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`${isUpPress ? 'w-4 h-4' : 'w-3 h-3'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
          )
        }
        {
          onDownClick && (
            <Button
              onClick={onDownClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`${isDownPress ? 'w-4 h-4' : 'w-3 h-3'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
          )
        }
      </th>
  )
}

export default TableNameHeaders
