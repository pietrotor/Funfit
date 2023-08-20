import Head from "next/head";
import { NavBar } from "./navBar/UsersNavBar";
import { UsersFooter } from "./footer/UsersFooter";
import { TNavBarStructure } from "@/components/layouts/navBar/UsersNavBar";
export type TClientLayoutProps = {
  children: React.ReactNode;
};
function ClientLayout({ children }: TClientLayoutProps) {
  const menu: TNavBarStructure = [
    {
      text: "Productos",
      link: "/",
    },
    {
      text: "Saludable",
      link: "/",
    },
    {
      text: "Promociones",
      link: "/contacto",
    },
   
  ];
  return (
    <>
      <NavBar menu={menu} />
      {children}
      <UsersFooter />
    </>
  );
}

export default ClientLayout;
