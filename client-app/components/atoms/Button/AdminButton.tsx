import { useRouter } from 'next/router'
import IconSelector, { TSvgNames } from '../IconSelector'
type TPropsAdminButton = {
  pathname?: string
  addPlusIcon?: boolean
  showMinIcon?: boolean
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
export const AdminButton = ({
  pathname,
  addPlusIcon = true,
  showMinIcon = false,
  iconName,
  color,
  text,
  disabled = false,
  textColor = 'text-white',
  onClick
}: TPropsAdminButton) => {
  const router = useRouter()
  return (
    <button
      disabled={disabled}
      color={color}
      className={`float-right my-4 flex items-end font-extrabold bg-${color} flex rounded-lg px-3 py-2 ${textColor} ${disabled ? 'cursor-not-allowed' : ''} `}
      onClick={pathname ? () => router.push({ pathname }) : onClick}
    >
      {addPlusIcon && <IconSelector name={'Plus'} />}
      <IconSelector
        name={iconName}
        className={`me-2 px-0 ${showMinIcon ? '' : 'md:hidden'} mx-0`}
      />
      <p className="hidden md:block">{text}</p>
    </button>
  )
}
