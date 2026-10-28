import React from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

type InformationCardProps = {
  title?: string | React.ReactNode
  showButton?: boolean
  description?: string | React.ReactNode
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
      className={clsx(
        'max-w-xl self-center rounded-2xl border border-stone-200 bg-white p-4 text-stone-600 shadow-[0_1px_3px_rgba(28,25,23,0.04)] md:max-w-full',
        className
      )}
    >
      {title && (
        <div className="mb-2 text-center font-amsipro text-xl font-bold tracking-tight text-tertiary md:text-2xl">
          {title}
        </div>
      )}
      {description && (
        <div className="text-center text-base font-medium text-stone-500">
          {description}
        </div>
      )}
      <div>{children}</div>
      {showButton && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => router.push(`${buttonDestination}`)}
            className="rounded-full bg-primary-600 px-4 py-2 text-lg font-semibold text-white transition duration-300 data-[hover=true]:bg-primary-darken data-[hover=true]:opacity-100"
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  )
}
