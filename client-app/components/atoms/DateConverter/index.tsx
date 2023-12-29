import React from 'react'

type DateConverterProps = {
  key: number
  dateString: string
}

const DateConverter: React.FC<DateConverterProps> = ({ key, dateString }) => {
  const formattedDate = new Date(dateString).toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' })

  return <span key={key}>{formattedDate}</span>
}

export default DateConverter
