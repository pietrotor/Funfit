import IconSelector from '@/components/atoms/IconSelector'
import Link from 'next/link'
import Image from 'next/image'
import { TSections } from '@/interfaces/Sections'

type TProps = {
  menu: TSections;
};

export function UsersFooter ({ menu }: TProps) {
  return (
    <footer className="bg-primary ">
      <div className="md:w-4/5  mx-auto flex md:justify-around flex-col md:flex-row ps-10 py-2">
        <section className="md:w-1/3 pe-10 flex flex-col items-center justify-center ">
          <Link href={'/'} className=' pb-1 rounded-lg h-20 w-28 flex items-center justify-center'>
            <Image
              src="/common/logoFooter.png"
              className=" rounded-xl"
              height="120"
              width="120"
              alt="logo"
            />
          </Link>
          <p className="lg:max-w-96 mt-6 text-white lg:flex  md:hidden">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque eius
            minus dolorum atque sunt culpa!
          </p>
        </section>
        <section className="md:w-1/3 flex flex-col my-6 md:items-center  text-white">
          <h3>Menu</h3>
          <ul className="flex flex-col  md:ms-5  mt-5 space-y-2">
            {menu.map((menuItem, idx) => (
              <li key={idx}>
                <Link href={`${menuItem.link}`}>
                  <h4 className="text-white hover:text-secondary/90 transition duration-150">
                    {menuItem.text}
                  </h4>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="md:w-1/3 my-6 text-white flex flex-col md:items-center">
          <h3 className="">Contáctanos</h3>
          <ul className="flex flex-col mt-5 space-y-4 ">
            <li className="cursor-pointer flex space-x-2">
              <IconSelector name="map" className="mt-1" />
              <h4 className='text-sm md:text-md'>Av. America esq. Beijing</h4>
            </li>
            <li className="flex cursor-pointer space-x-2">
              <IconSelector name="telf" />
              <h4 className='text-sm md:text-md'>+591 73774486</h4>
            </li>
          </ul>
        </section>
      </div>
      <hr className='lg:mx-32 md:12 mx-8 border-t-1' />
      <div className="flex text-gray-200 justify-center  pb-5 items-center mt-2 space-x-12">
        <a
          href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwa.me%2Fmessage%2F672UKAAXOLFKP1%3Ffbclid%3DIwAR1zm2nLyBFXcwqhDI0SsW4syYMS8tiw-gYwgGSABitTn0TIZRevBXfq--U&h=AT34fWpqRUYRDB5oZAk2K7IzKIHsGiKgmNiWJcOtQqc9DfX9bfxc2WSqRmvwnyYHmTJEnGdMEuIdAc4YeC38IFjLjljNwmwl3mbXKnW-2VzXfqgQMboonxLo_8RaZDtXTQ4MbRWiAOPtGJ-jBji3pQ"
          target="_blank" rel="noreferrer"
        >
          <IconSelector
            className='hover:fill-secondary transition-all duration-400'
            name="whatsapp"
            width="w-10"
            height="md:h-10 h-8"
            color="text-white"
          />
        </a>
        <a
          href="https://www.facebook.com/FunfitbyFuncake?locale=es_LA"
          target="_blank" rel="noreferrer"
        >
          <IconSelector
            className='hover:fill-secondary transition-all duration-400'
            name="facebook"
            width="w-8"
            height="md:h-8 h-6"
            color="text-white"
          />
        </a>
        <a href="https://www.instagram.com/funfitbo/" target="_blank" rel="noreferrer">
          {' '}
          <IconSelector
            className='hover:fill-secondary transition-all duration-400'
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
