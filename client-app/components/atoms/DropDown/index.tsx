import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import IconSelector from '../IconSelector'

type DropDownProps = {
  label: string
  values: string[]
  handleClick: () => void
}
export const DropDown = ({ label, values, handleClick }: DropDownProps) => {
  return (
    <div className="mt-8 md:me-4 ">
      <Dropdown >
        <DropdownTrigger>
          <Button color='primary' variant="bordered">{label}</Button>
        </DropdownTrigger>
        <DropdownMenu color='primary' aria-label="Static Actions">
          {values.map((value, index) => (
            <DropdownItem color='primary' key={index} onClick={handleClick}>
              <div className='flex'>
                <IconSelector name='Logout' className='me-2' />
                {value}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
