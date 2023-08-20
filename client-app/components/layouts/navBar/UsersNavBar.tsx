import React from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import IconSelector from "@/components/molecules/IconSelector";

export type TNavBarStructure = {
  text: string;
  link: string;
  
}[];
type TProps = {
  menu: TNavBarStructure;
};

export function NavBar({ menu }: TProps) {
  return (
    <Navbar
      shouldHideOnScroll
      className=" bg-gradient-to-r from-primary to-tertiary  h-36  "
    >
      <NavbarBrand>
        <Image src="/logo.png" height="110" width="110" alt="logo" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menu.map((menuItem, idx) => (
          <NavbarItem>
            <Link color="foreground" className="text-white text-xl" href="#">
              {menuItem.text}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-white text-xl">
            Ingresar
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            className="text-xl text-white"
            variant="flat"
          >
            <IconSelector name="user" />
            Registrarse
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
