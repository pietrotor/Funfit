import React from 'react'
import { TSections } from '@/interfaces/Sections'

interface NavProps {
  menu: TSections
}

const Nav: React.FC<NavProps> = ({ menu }) => {
  return (
    <nav className="mx-9 flex flex-col md:flex-row md:items-center md:space-x-5  ">
      {menu.map((menuItem, idx) => (
        <div key={idx}>
          <a
            href="#"
            className="text-xl font-bold text-primary hover:text-orange-300"
          >
            {menuItem.text}
          </a>
        </div>
      ))}
    </nav>
  )
}

export default Nav
