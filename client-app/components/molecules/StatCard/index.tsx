import React from 'react'
import clsx from 'clsx'
import { LucideIcon } from 'lucide-react'

type TStatTone = 'neutral' | 'success' | 'warning' | 'danger' | 'primary'

type TStatCardProps = {
  label: string
  value: React.ReactNode
  icon?: LucideIcon
  iconNode?: React.ReactNode
  tone?: TStatTone
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

const toneStyles: Record<
  TStatTone,
  { iconBg: string; iconText: string; border: string }
> = {
  neutral: {
    iconBg: 'bg-stone-100',
    iconText: 'text-stone-600',
    border: 'border-stone-200'
  },
  primary: {
    iconBg: 'bg-primary/10',
    iconText: 'text-primary-600',
    border: 'border-stone-200'
  },
  success: {
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-700',
    border: 'border-stone-200'
  },
  warning: {
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-700',
    border: 'border-stone-200'
  },
  danger: {
    iconBg: 'bg-red-50',
    iconText: 'text-red-600',
    border: 'border-stone-200'
  }
}

const StatCard: React.FC<TStatCardProps> = ({
  label,
  value,
  icon: Icon,
  iconNode,
  tone = 'neutral',
  isLoading = false,
  className,
  children
}) => {
  const styles = toneStyles[tone]

  return (
    <div
      className={clsx(
        'rounded-2xl border bg-white p-4 shadow-[0_1px_3px_rgba(28,25,23,0.04)]',
        styles.border,
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
            {label}
          </p>
          {isLoading ? (
            <div className="mt-2 h-7 w-24 animate-pulse rounded-md bg-stone-100" />
          ) : (
            <p className="num mt-1 truncate text-xl font-semibold text-tertiary md:text-2xl">
              {value}
            </p>
          )}
        </div>
        {iconNode ? (
          <div
            className={clsx(
              'flex h-10 shrink-0 items-center justify-center rounded-xl px-2',
              styles.iconBg
            )}
          >
            {iconNode}
          </div>
        ) : (
          Icon && (
            <div
              className={clsx(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                styles.iconBg,
                styles.iconText
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </div>
          )
        )}
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  )
}

export default StatCard
