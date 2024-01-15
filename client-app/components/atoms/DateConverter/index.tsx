import React from 'react'

type DateConverterProps = {
  key?: number
  dateString: string
  showTime?: boolean
}

const DateConverter: React.FC<DateConverterProps> = ({ key, dateString, showTime }) => {
  const formattedDate = new Date(dateString).toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' })
  const formattedTime = new Date(dateString).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit', hour12: true })
  return <div className='flex flex-col'>
          <span key={key}>{formattedDate} </span>
          <span>{showTime && formattedTime} </span>
    </div>
}

export default DateConverter
