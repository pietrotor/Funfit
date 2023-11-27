import IconSelector from '@/components/atoms/IconSelector'
import { Button } from '@nextui-org/react'
import React from 'react'
import { TSections } from '@/interfaces/Sections'

interface NavProps {
    menu: TSections
}

const Nav: React.FC<NavProps> = ({ menu }) => {
  return (
        <nav className='flex flex-col md:flex-row md:space-x-5 md:items-center mx-9  '>
            {menu.map((menuItem, idx) => (
                <div key={idx}>
                    <a
                        href="#"
                        className="text-primary hover:text-orange-300 text-xl"
                    >
                        {menuItem.text}
                    </a>
                </div>
            ))}
            <hr />
            <div className=' flex justify-between mt-2 space-x-2 p-2'>
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
  )
}

export default Nav
