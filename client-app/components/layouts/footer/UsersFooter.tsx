import IconSelector from '@/components/molecules/IconSelector'
import Link from 'next/link'
import Image from 'next/image'
export function UsersFooter () {
  return (
    <footer className="bg-primary ">
      <div className="w-4/5 mx-auto flex py-4">
        <section className="w-1/3 flex flex-col items-center justify-center">
          <Link href={'/'}>
            <Image
              src="/common/logo.png"
              className=" rounded-xl bg-white"
              height="100"
              width="100"
              alt="logo"
            />
          </Link>
          <p className="w-96 mt-6 text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque eius
            minus dolorum atque sunt culpa! Eveniet sed aut ipsam iste
            exercitationem eaque aliquid inventore?
          </p>
          <div className="flex text-gray-200 justify-around items-center  mt-5 space-x-12">
            <a
              href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwa.me%2Fmessage%2F672UKAAXOLFKP1%3Ffbclid%3DIwAR1zm2nLyBFXcwqhDI0SsW4syYMS8tiw-gYwgGSABitTn0TIZRevBXfq--U&h=AT34fWpqRUYRDB5oZAk2K7IzKIHsGiKgmNiWJcOtQqc9DfX9bfxc2WSqRmvwnyYHmTJEnGdMEuIdAc4YeC38IFjLjljNwmwl3mbXKnW-2VzXfqgQMboonxLo_8RaZDtXTQ4MbRWiAOPtGJ-jBji3pQ"
              target="_blank" rel="noreferrer"
            >
              <IconSelector
                name="whatsapp"
                width="w-12"
                height="h-12"
                color="text-white"
              />
            </a>
            <a
              href="https://www.facebook.com/FunfitbyFuncake?locale=es_LA"
              target="_blank" rel="noreferrer"
            >
              <IconSelector
                name="facebook"
                width="w-10"
                height="h-10"
                color="text-white"
              />
            </a>
            <a href="https://www.instagram.com/funfitbo/" target="_blank" rel="noreferrer">
              {' '}
              <IconSelector
                name="instagram"
                width="w-12"
                height="h-12"
                color="text-white"
              />{' '}
            </a>
          </div>
        </section>
        <section className="w-1/3  flex flex-col my-6 items-center text-white">
          <h2>Menu</h2>
          <ul className="flex flex-col ms-5 mt-5 space-y-2">
            <li>
              <Link href={'/'}>
                <h3 className="text-white hover:text-gray-200 transition duration-150">
                  Inicio
                </h3>
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <h3 className="text-white hover:text-gray-200 transition duration-150">
                  Contacto
                </h3>
              </Link>
            </li>
          </ul>
        </section>
        <section className="w-1/3  my-6 text-white">
          <h2 className="ms-20">Contáctanos</h2>
          <div className="flex flex-col items-center">
            <ul className="flex flex-col mt-5 ms-2 space-y-4 ">
              <li className="cursor-pointer flex space-x-2">
                <IconSelector name="map" className="mt-1" />
                <h4>Av. America esq. Beijing</h4>
              </li>
              <li className="flex cursor-pointer space-x-2">
                <IconSelector name="telf" />
                <h4>+591 73774486</h4>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </footer>
  )
}
