import { Button } from '@nextui-org/react'
import React from 'react'
import IconSelector from '@/components/atoms/IconSelector'
import { TSections } from '@/interfaces/Sections'

interface NavProps {
  menu: TSections
}

const Nav: React.FC<NavProps> = ({ menu }) => {
  return (
    <nav className="mx-9 flex flex-col md:flex-row md:items-center md:space-x-5  ">
      {menu.map((menuItem, idx) => (
        <div key={idx}>
          <a href="#" className="text-xl text-primary hover:text-orange-300">
            {menuItem.text}
          </a>
        </div>
      ))}
      <hr />
      <div className=" mt-2 flex justify-between space-x-2 p-2">
        <Button className="flex  w-36  items-center text-xl text-primary hover:bg-secondary/40 md:w-44">
          <span>
            <IconSelector name="login" />
          </span>
          Ingresar
        </Button>
        <Button
          href="#"
          className="flex w-36 items-center text-xl text-primary hover:bg-secondary/40 md:w-44"
        >
          <span>
            <IconSelector name="user" />
          </span>
          Registrarse
        </Button>
      </div>
    </nav>
  )
}

export default Nav
