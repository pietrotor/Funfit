import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown } from 'lucide-react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'

type TableNameHeadersProps = {
  title: string
  color?: 'light' | 'dark'
  onUpClick?: () => void
  onDownClick?: () => void
  isUpPress?: boolean
  isDownPress?: boolean
}

const TableNameHeaders = ({
  title,
  onUpClick,
  onDownClick
}: TableNameHeadersProps) => {
  const canSort = !!(onUpClick || onDownClick)

  return (
    <th className="max-w-sm border-b border-stone-200 bg-stone-50 px-4 py-3 text-left text-xs font-semibold tracking-wide text-stone-500">
      <div className="flex items-center gap-1.5">
        <span>{title}</span>
        {canSort && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button
                type="button"
                aria-label={`Ordenar por ${title}`}
                className="rounded p-0.5 text-stone-400 outline-none transition-colors hover:bg-stone-200 hover:text-stone-600"
              >
                <ArrowUpDown className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Opciones de ordenamiento">
              {onUpClick ? (
                <DropdownItem
                  key="asc"
                  onClick={onUpClick}
                  startContent={
                    <ArrowUpAZ className="h-4 w-4" strokeWidth={1.75} />
                  }
                >
                  Ascendente
                </DropdownItem>
              ) : (
                <></>
              )}
              {onDownClick ? (
                <DropdownItem
                  key="desc"
                  onClick={onDownClick}
                  startContent={
                    <ArrowDownAZ className="h-4 w-4" strokeWidth={1.75} />
                  }
                >
                  Descendente
                </DropdownItem>
              ) : (
                <></>
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </th>
  )
}

export default TableNameHeaders
