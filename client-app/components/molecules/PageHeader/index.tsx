import React from 'react'
import clsx from 'clsx'

type TPageHeaderProps = {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

const PageHeader: React.FC<TPageHeaderProps> = ({
  title,
  description,
  actions,
  className
}) => {
  return (
    <header
      className={clsx(
        'mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className="min-w-0">
        <h1 className="font-amsipro text-2xl font-bold tracking-tight text-tertiary md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-stone-500 md:text-[15px]">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  )
}

export default PageHeader
