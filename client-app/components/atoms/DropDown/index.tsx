import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import IconSelector, { TSvgNames } from '../IconSelector'

type DropDownProps = {
  label: string
  values: string[]
  handleClick: () => void
  IconButtonName: TSvgNames
}
export const DropDown = ({
  label,
  values,
  handleClick,
  IconButtonName
}: DropDownProps) => {
  return (
    <div className="absolute right-24 top-8">
      <Dropdown>
        <DropdownTrigger>
          <Button color="primary" variant="bordered">
            {' '}
            <IconSelector name={IconButtonName} /> {label}
          </Button>
        </DropdownTrigger>
        <DropdownMenu color="primary" aria-label="Static Actions">
          {values.map((value, index) => (
            <DropdownItem color="primary" key={index} onClick={handleClick}>
              <div className="flex">
                <IconSelector name="Logout" className="me-2" />
                {value}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
