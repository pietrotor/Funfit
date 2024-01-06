import { useRouter } from 'next/router'
import IconSelector, { TSvgNames } from '../IconSelector'
 type TPropsAdminButton = {
  pathname?: string
  addPlusIcon?: boolean
  showMinIcon?: boolean
  textColor?: string
  text: string
  iconName: TSvgNames
  onClick?: ()=> void
  color?:'primary' | 'success' | 'warning' | 'secondary' | 'default' | 'danger' | undefined
}
export const AdminButton = ({ pathname, addPlusIcon = true, showMinIcon = false, iconName, color, text, textColor = 'text-white', onClick }:TPropsAdminButton) => {
  const router = useRouter()
  return (
        <button
              color={color}
              className={`float-right my-4 font-extrabold flex items-end bg-${color} flex px-3 py-2 rounded-lg ${textColor}`}
              onClick={ pathname ? () => router.push({ pathname }) : onClick }
            >
              { addPlusIcon &&
                <IconSelector name={'Plus'} />
              }
              <IconSelector name={iconName} className={`px-0 me-2 ${showMinIcon ? '' : 'md:hidden'} mx-0`} />
              <p className='hidden md:block'>
              {text}
              </p>
            </button>
  )
}
