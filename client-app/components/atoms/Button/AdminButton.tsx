import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import IconSelector, { TSvgNames } from '../IconSelector'

type TPropsAdminButton = {
  pathname?: string
  addPlusIcon?: boolean
  showMinIcon?: boolean
  className?: string
  textColor?: string
  text: string
  disabled?: boolean
  iconName: TSvgNames
  onClick?: () => void
  color?:
    | 'primary'
    | 'success'
    | 'warning'
    | 'secondary'
    | 'default'
    | 'danger'
    | undefined
}

const colorMap: Record<
  NonNullable<TPropsAdminButton['color']>,
  { bg: string; hover: string; text: string }
> = {
  primary: {
    bg: 'bg-primary-600',
    hover: 'data-[hover=true]:bg-primary-darken',
    text: 'text-white'
  },
  success: {
    bg: 'bg-success',
    hover: 'data-[hover=true]:bg-emerald-700',
    text: 'text-white'
  },
  warning: {
    bg: 'bg-amber-500',
    hover: 'data-[hover=true]:bg-amber-600',
    text: 'text-white'
  },
  secondary: {
    bg: 'bg-secondary',
    hover: 'data-[hover=true]:bg-secondary-darken',
    text: 'text-tertiary'
  },
  default: {
    bg: 'bg-stone-600',
    hover: 'data-[hover=true]:bg-stone-700',
    text: 'text-white'
  },
  danger: {
    bg: 'bg-red-600',
    hover: 'data-[hover=true]:bg-red-700',
    text: 'text-white'
  }
}

export const AdminButton = ({
  pathname,
  addPlusIcon = true,
  showMinIcon = false,
  className = '',
  iconName,
  color = 'primary',
  text,
  disabled = false,
  textColor,
  onClick
}: TPropsAdminButton) => {
  const router = useRouter()
  const colors = colorMap[color || 'primary']

  return (
    <Button
      disabled={disabled}
      className={clsx(
        'h-11 min-h-11 gap-1.5 font-semibold shadow-[0_6px_16px_-8px_rgba(224,108,0,0.45)]',
        colors.bg,
        colors.hover,
        textColor || colors.text,
        'data-[hover=true]:opacity-100',
        className
      )}
      onClick={pathname ? () => router.push({ pathname }) : onClick}
    >
      {addPlusIcon && <IconSelector name="Plus" />}
      <IconSelector
        name={iconName}
        className={clsx(showMinIcon ? '' : 'md:hidden')}
      />
      <span className="text-sm">{text}</span>
    </Button>
  )
}
