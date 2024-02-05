import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User
} from '@nextui-org/react'
import IconSelector, { TSvgNames } from '../IconSelector'

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
}
export const DropDown = ({
  label,
  values,
  IconButtonName,
  avatar,
  user,
  counter,
  className,
  fill
}: DropDownProps) => {
  return (
    <div className={` mt-8 md:me-4 ${className}`}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div>
            {avatar ? (
              <Badge content={counter} color='primary' size='lg'>
                <div className='cursor-pointer p-white rounded-full border-double border-gray-300 bg-gray-300 p-2'>
                <IconSelector name={IconButtonName} />
              </div>
              </Badge>
            ) : (
              user && (
                <div className={` border-2 rounded-full px-2 py-1 flex items-center ${fill && 'bg-white hover:bg-gray-100 transition-all duration-100'} `}>
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
              <div className="flex space-x-2 pt-3">
                {value.counter ? (
                  <Badge
                    content={value.counter}
                    color="primary"
                    size="lg"
                    shape="circle"
                  >
                    <IconSelector name={value.icon} className="me-2" />
                  </Badge>
                ) : (
                  <IconSelector name={value.icon} className="me-2" />
                )}
                <p>{value.label}</p>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
