import React from 'react'

type DateConverterProps = {
  dateString: string
}

const DateConverter: React.FC<DateConverterProps> = ({ dateString }) => {
  const formattedDate = new Date(dateString).toLocaleDateString()

  return <span>{formattedDate}</span>
}

export default DateConverter
