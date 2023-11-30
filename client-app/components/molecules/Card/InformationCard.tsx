import React from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
type InformationCardProps = {
  title: string;
  showButton?: boolean;
  description?: string;
  buttonText?: string;
  buttonDestination?: string;
  children?: React.ReactNode;
  className?: string;
}
export default function InformationCard ({ title, showButton = false, description, buttonText, buttonDestination, children, className }: InformationCardProps) {
  const router = useRouter()
  return <div className={`bg-white ${className} max-w-xl md:max-w-6xl p-8 self-center rounded-lg shadow-xl border-2 text-gray-500`}>
    <h1 className="text-4xl font-extrabold text-center mb-4">
      {title}
    </h1>
    <h2 className="text-2xl font-semibold text-center">
      {description}
    </h2>
    <div className="mt-6">
      {children}
    </div>
    <div className="mt-6 flex justify-center">
      {showButton && <Button onClick={() => router.push(`${buttonDestination}`)} className="bg-primary text-white py-2 px-4 rounded-full text-lg font-semibold hover:bg-opacity-80 transition duration-300">
        {buttonText}
      </Button>}
    </div>
  </div>
}
