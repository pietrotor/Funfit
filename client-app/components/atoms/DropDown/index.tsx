import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User
} from '@nextui-org/react'
import IconSelector, { TSvgNames } from '../IconSelector'
import { useEffect } from 'react'

type TValuesDropDown = {
  label: string
  value: string
  handleClick: () => void
  icon: TSvgNames
  counter?: number
  avatar?: string
  user?: string
}

type DropDownProps = {
  label?: string
  values: TValuesDropDown[]
  IconButtonName: TSvgNames
  avatar?: string
  user?: string
  counter?: number
  className?: string
  fill?: boolean
  onClick?: () => void
}
export const DropDown = ({
  label,
  values,
  IconButtonName,
  avatar,
  user,
  counter = 0,
  className,
  fill,
  onClick
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

  return (
    <div className={` mt-8 md:me-4 ${className}`}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div>
            {avatar ? (
              <>
                {(counter || 0) > 0 && (
                  <Badge
                    content={counter}
                    color="primary"
                    size="lg"
                    className="-right-2 -top-2 animate-bounce"
                  >
                    <div
                      onClick={onClick}
                      className="p-white cursor-pointer rounded-full border-double border-gray-300 bg-gray-300 p-2"
                    >
                      <IconSelector name={IconButtonName} />
                    </div>
                  </Badge>
                )}
              </>
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
                    <IconSelector name={value.icon} width="w-5" height="h-5" />
                  </Badge>
                ) : (
                  <IconSelector name={value.icon} width="w-5" height="h-5" />
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
