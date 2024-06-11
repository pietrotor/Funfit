import Link from 'next/link'
import Image from 'next/image'

import IconSelector from '@/components/atoms/IconSelector'
import { TSections } from '@/interfaces/Sections'

type TProps = {
  menu: TSections
}

export function UsersFooter({ menu }: TProps) {
  return (
    <footer className="bg-primary ">
      <div className="mx-auto  flex flex-col py-2 ps-10 md:w-4/5 md:flex-row md:justify-around">
        <section className="flex flex-col items-center justify-center pe-10 md:w-1/3 ">
          <Link
            href={'/'}
            className=" flex h-20 w-28 items-center justify-center rounded-lg pb-1"
          >
            <Image
              src="/common/logoFooter.png"
              className=" rounded-xl"
              height="120"
              width="120"
              alt="logo"
            />
          </Link>
          <p className="lg:max-w-96 pt-6 text-white md:hidden  lg:flex">
            Todos nuestros productos son libres de gluten aptos para personas
            celiacas e intolerantes al gluten.
          </p>
        </section>
        <section className="my-6 flex flex-col text-white md:w-1/3  md:items-center">
          <h3>Menu</h3>
          <ul className="mt-5 flex  flex-col  space-y-2 md:ms-5">
            {menu.map((menuItem, idx) => (
              <li key={idx}>
                <Link href={`${menuItem.link}`}>
                  <h4 className="text-white transition duration-150 hover:text-secondary/90">
                    {menuItem.text}
                  </h4>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="my-6 flex flex-col text-white md:w-1/3 md:items-center">
          <h3 className="">Contáctanos</h3>
          <ul className="mt-5 flex flex-col space-y-4 ">
            <li className="flex cursor-pointer space-x-2">
              <IconSelector name="map" className="mt-1" />
              <h4 className="md:text-md text-sm">
                Venezuela #520 entre San Martín y Lanza. A media cuadra de la
                plaza colón, Cochabamba, Bolivia
              </h4>
            </li>
            <li className="flex cursor-pointer space-x-2">
              <IconSelector name="telf" />
              <h4 className="md:text-md text-sm">73774486</h4>
            </li>
          </ul>
        </section>
      </div>
      <hr className="md:12 mx-8 border-t-1 lg:mx-32" />
      <div className="mt-2 flex items-center  justify-center space-x-12 pb-5 text-gray-200">
        <a
          href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwa.me%2Fmessage%2F672UKAAXOLFKP1%3Ffbclid%3DIwAR1zm2nLyBFXcwqhDI0SsW4syYMS8tiw-gYwgGSABitTn0TIZRevBXfq--U&h=AT34fWpqRUYRDB5oZAk2K7IzKIHsGiKgmNiWJcOtQqc9DfX9bfxc2WSqRmvwnyYHmTJEnGdMEuIdAc4YeC38IFjLjljNwmwl3mbXKnW-2VzXfqgQMboonxLo_8RaZDtXTQ4MbRWiAOPtGJ-jBji3pQ"
          target="_blank"
          rel="noreferrer"
        >
          <IconSelector
            className="transition-all duration-400 hover:fill-secondary"
            name="whatsapp"
            width="w-10"
            height="md:h-10 h-8"
            color="text-white"
          />
        </a>
        <a
          href="https://www.facebook.com/FunfitbyFuncake?locale=es_LA"
          target="_blank"
          rel="noreferrer"
        >
          <IconSelector
            className="transition-all duration-400 hover:fill-secondary"
            name="facebook"
            width="w-8"
            height="md:h-8 h-6"
            color="text-white"
          />
        </a>
        <a
          href="https://www.instagram.com/funfitbo/"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          <IconSelector
            className="transition-all duration-400 hover:fill-secondary"
            name="instagram"
            width="w-10"
            height="md:h-10 h-8 "
            color="text-white"
          />{' '}
        </a>
      </div>
    </footer>
  )
}
