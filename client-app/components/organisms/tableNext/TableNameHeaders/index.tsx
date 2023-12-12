import IconSelector from '@/components/atoms/IconSelector'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

// import { Button } from 'ui'
type TableNameHeadersProps = {
    title: string;
    color?: 'light' | 'dark';
    onUpClick?: () => void;
    onDownClick?: () => void;
    isUpPress?: boolean;
    isDownPress?: boolean;
}
const TableNameHeaders = ({ title, color = 'light', onUpClick, onDownClick, isUpPress = false, isDownPress = false }: TableNameHeadersProps) => {
  return (
        <th
        className={
          'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 max-w-sm font-semibold text-left' +
          (color === 'light'
            ? 'bg-sky-50 text-primary-light border-sky-100'
            : 'bg-primary-darken text-blue-white border-blue-500')
        }
      >
        <div className="flex justify-center font-bold gap-1 md:gap-2 items-center">
          {title}
          <div className={`flex items-center gap-4 ${onUpClick || onDownClick ? 'visible' : 'hidden'}`}>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className='w-fit m-auto rounded-full outline-none appearance-none'>
                  <IconSelector name='check' width="w-4"/>
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions">
                {onUpClick
                  ? <DropdownItem onClick={onUpClick}>
                      <div className="w-full flex gap-2 items-center">
                        <IconSelector name='arrow-left' width="w-4"/>
                        Ordenar ascendentemente
                      </div>
                    </DropdownItem>
                  : <></>
                }
                {onDownClick
                  ? <DropdownItem onClick={onDownClick}>
                      <div className="w-full flex gap-2 items-center">
                        <IconSelector name='down-arrow' width="w-4"/>
                        Ordenar descendentemente
                      </div>
                    </DropdownItem>
                  : <></>
                }
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </th>
  )
}

export default TableNameHeaders
