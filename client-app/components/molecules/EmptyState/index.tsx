import React from 'react'
import { Inbox, LucideIcon } from 'lucide-react'
import clsx from 'clsx'

type TEmptyStateProps = {
  title?: string
  description?: string
  icon?: LucideIcon
  action?: React.ReactNode
  className?: string
}

const EmptyState: React.FC<TEmptyStateProps> = ({
  title = 'Sin registros',
  description,
  icon: Icon = Inbox,
  action,
  className
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center px-6 py-12 text-center',
        className
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-400">
        <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden />
      </div>
      <p className="font-amsipro text-lg font-semibold text-tertiary">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-stone-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export default EmptyState
