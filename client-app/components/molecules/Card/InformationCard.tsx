import React from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
type InformationCardProps = {
  title: string
  showButton?: boolean
  description?: string
  buttonText?: string
  buttonDestination?: string
  children?: React.ReactNode
  className?: string
}
export default function InformationCard({
  title,
  showButton = false,
  description,
  buttonText,
  buttonDestination,
  children,
  className
}: InformationCardProps) {
  const router = useRouter()
  return (
    <div
      className={`bg-white ${className} max-w-xl self-center rounded-lg border-2 p-8 text-gray-500 shadow-xl md:max-w-4xl`}
    >
      <h1 className="mb-4 text-center text-3xl font-extrabold">{title}</h1>
      <h2 className="text-center text-2xl font-semibold">{description}</h2>
      <div className="mt-6">{children}</div>
      <div className="mt-6 flex justify-center">
        {showButton && (
          <Button
            onClick={() => router.push(`${buttonDestination}`)}
            className="rounded-full bg-primary px-4 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-opacity-80"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  )
}
