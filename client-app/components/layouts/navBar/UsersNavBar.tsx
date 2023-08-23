import React from 'react'
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
  return (
    <header className="bg-white py-4 shadow-2xl">
      <div className="w-full max-w-7xl m-auto flex items-center">
        <div className="flex items-center">
          <Image src="/common/logo.png" alt="logo" className="h-28 w-28" height={100} width={100} />
        </div>
        <nav className="ml-auto flex space-x-5 items-center">
          {menu.map((menuItem, idx) => (
            <div key={idx}>
              <a
                href="#"
                className="text-primary hover:text-orange-300 transition duration-150 ease-out text-xl"
              >
                {menuItem.text}
              </a>
            </div>
          ))}
          <a
            href="#"
            className="hidden lg:flex text-primary hover:text-orange-300 transition duration-150 ease-out text-xl"
          >
            Ingresar
          </a>
          <Button href="#" className="text-xl text-primary flex items-center hover:bg-secondary/40">
            <span>
              <IconSelector name="user" />
            </span>
            Registrarse
          </Button>
        </nav>
      </div>
    </header>
  )
}
