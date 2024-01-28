import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import IconSelector, { TSvgNames } from '../IconSelector'

 type TValuesDropDown ={
  label: string
  value: string
  handleClick: () => void
  icon : TSvgNames
  counter? : number
}

type DropDownProps = {
  label: string
  values: TValuesDropDown[]
  IconButtonName : TSvgNames
}
export const DropDown = ({ label, values, IconButtonName }: DropDownProps) => {
  return (
    <div className="mt-8 md:me-4 ">
      <Dropdown >
        <DropdownTrigger>
          <Button color='primary' variant="bordered"> <IconSelector
          name={IconButtonName}
          /> {label}</Button>
        </DropdownTrigger>
        <DropdownMenu color='primary' aria-label="Static Actions">
          {values.map((value, index) => (
            <DropdownItem color='primary' key={index} onClick={value.handleClick}>
              <div className='flex space-x-2 pt-3'>
                {value.counter ? <Badge content ={value.counter} color='primary' size='lg' shape="circle" >
                <IconSelector name={value.icon} className='me-2' />
                </Badge> : <IconSelector name={value.icon} className='me-2' />}
                <p>{value.label}</p>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
