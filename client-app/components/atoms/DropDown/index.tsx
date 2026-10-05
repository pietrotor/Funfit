import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User
} from '@nextui-org/react'
import { useEffect } from 'react'
import { LucideIcon } from 'lucide-react'

type TValuesDropDown = {
  label: string
  value: string
  handleClick: () => void
  icon: LucideIcon
  counter?: number
  avatar?: string
  user?: string
}

type DropDownProps = {
  label?: string
  values: TValuesDropDown[]
  IconButton?: LucideIcon
  avatar?: string
  user?: string
  counter?: number
  className?: string
  fill?: boolean
  onClick?: () => void
  iconButtonLabel?: string
}
export const DropDown = ({
  label,
  values,
  IconButton,
  avatar,
  user,
  counter = 0,
  className,
  fill,
  onClick,
  iconButtonLabel = 'Abrir menú'
}: DropDownProps) => {
  useEffect(() => {
    const makeSound = () => {
      const audio = new Audio('/sounds/notification-sound.mp3')
      audio.play()
    }
    let interval: any

    if (counter > 0) {
      setTimeout(() => {
        makeSound()
      }, 5000)
      interval = setInterval(() => {
        makeSound()
      }, 3000)
    }

    return () => clearInterval(interval)
  }, [counter])

  const iconTrigger = IconButton ? (
    <button
      type="button"
      onClick={onClick}
      aria-label={iconButtonLabel}
      className="cursor-pointer rounded-full bg-gray-200 p-2 text-gray-700 transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <IconButton className="h-6 w-6" strokeWidth={1.75} />
    </button>
  ) : null

  return (
    <div className={` mt-8 md:me-4 ${className}`}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div>
            {avatar ? (
              (counter || 0) > 0 ? (
                <Badge
                  content={counter}
                  color="primary"
                  size="lg"
                  className="-right-2 -top-2"
                >
                  {iconTrigger}
                </Badge>
              ) : (
                iconTrigger
              )
            ) : (
              user && (
                <div
                  className={` flex items-center rounded-full border-2 px-2 py-1 ${
                    fill &&
                    'bg-white transition-all duration-100 hover:bg-gray-100'
                  } `}
                >
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: false,
                      src: ''
                    }}
                    className="transition-transform"
                    description={`@${label}Funfit`}
                    name={label}
                  />
                </div>
              )
            )}
          </div>
        </DropdownTrigger>
        <DropdownMenu color="primary" aria-label="Static Actions">
          {values.map((value, index) => (
            <DropdownItem
              color="primary"
              key={index}
              onClick={value.handleClick}
            >
              <div className="flex items-center space-x-2 pt-3">
                {value.counter ? (
                  <Badge
                    content={value.counter}
                    color="primary"
                    size="lg"
                    shape="circle"
                  >
                    <value.icon className="h-5 w-5" strokeWidth={1.75} />
                  </Badge>
                ) : (
                  <value.icon className="h-5 w-5" strokeWidth={1.75} />
                )}
                <p className="text-sm">{value.label}</p>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
