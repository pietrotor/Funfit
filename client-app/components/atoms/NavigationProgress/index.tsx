import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const NavigationProgress = () => {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    let trickle: number | undefined
    let hide: number | undefined

    const start = () => {
      window.clearInterval(trickle)
      window.clearTimeout(hide)
      setVisible(true)
      setWidth(8)
      trickle = window.setInterval(() => {
        setWidth(current => (current < 88 ? current + Math.random() * 10 : current))
      }, 180)
    }

    const done = () => {
      window.clearInterval(trickle)
      setWidth(100)
      hide = window.setTimeout(() => {
        setVisible(false)
        setWidth(0)
      }, 220)
    }

    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', done)
    router.events.on('routeChangeError', done)

    return () => {
      window.clearInterval(trickle)
      window.clearTimeout(hide)
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', done)
      router.events.off('routeChangeError', done)
    }
  }, [router.events])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px]"
    >
      <div
        className="h-full bg-primary-600 shadow-[0_0_10px_rgba(224,108,0,0.55)] transition-[width,opacity] duration-200 ease-out"
        style={{ width: `${width}%`, opacity: visible ? 1 : 0 }}
      />
    </div>
  )
}

export default NavigationProgress
