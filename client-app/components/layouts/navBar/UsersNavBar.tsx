import React, { useState } from 'react'
import Image from 'next/image'

import IconSelector from '@/components/molecules/IconSelector'
import { Button } from '@nextui-org/react'

export type TNavBarStructure = {
  text: string;
  link: string;
}[];
type TProps = {
  menu: TNavBarStructure;
};

export function NavBar ({ menu }: TProps) {
  const [toggle, setToggle] = useState<boolean>(false)
  const baseClasses = 'flex flex-col md:flex-row md:space-x-5 md:items-center'
  const toggleClasses = toggle
    ? 'z-[1] mx-4 md:z-auto md:static'
    : 'z-[-1] absolute mx-4 md:mx-0 md:ml-auto md:z-auto md:static md:mx-0 md:ml-auto'
  const navClasses = `${baseClasses} ${toggleClasses}`

  return (
    <header className="bg-white md:py-4 shadow-2xl">
      <div className="flex flex-col md:w-full md:max-w-7xl md:m-auto md:flex-row md:items-center">
        <div className="flex items-center justify-around">
          <Image src="/common/logo.png" alt="logo" className="h-28 w-28" height={100} width={100} />
          <span className='w-10 h-10 mt-6' onClick={() => setToggle(!toggle)}>
            <IconSelector width="w-full" height='h-full' name={toggle ? 'close' : 'menu'} className="md:hidden" color="text-secondary" />
          </span>
        </div>
        <nav className={navClasses}>
          {menu.map((menuItem, idx) => (
            <div key={idx}>
              <a
                href="#"
                className="text-primary  hover:text-orange-300 transition duration-150 ease-out text-xl"
              >
                {menuItem.text}
              </a>
            </div>
          ))}
          <hr />
          <div className=' flex justify-between mt-2 md:space-x-2 p-2'>
            <Button className="text-xl  w-36  text-primary flex items-center hover:bg-secondary/40 md:w-44">
              <span>
                <IconSelector name="login" />
              </span>
              Ingresar
            </Button>
            <Button href="#" className="text-xl w-36 text-primary flex items-center hover:bg-secondary/40 md:w-44">
              <span>
                <IconSelector name="user" />
              </span>
              Registrarse
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
