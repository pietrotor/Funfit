import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

type TAccordionProps = {
  children: React.ReactNode,
  isOpen: boolean,
  setIsOpen: (open: boolean) => void
}

const Accordion: React.FC<TAccordionProps> = ({
  children,
  isOpen,
  setIsOpen
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [accordionHeight, setAccordionHeight] = useState(0)
  useEffect(() => {
    if (isOpen) setAccordionHeight(ref?.current?.clientHeight || 0)
    else setAccordionHeight(0)
  }, [isOpen, ref.current?.clientHeight])

  return (
    <div>
      <div
        className="w-full transition-all duration-300 overflow-hidden "
        onClick={() => setIsOpen(!isOpen)}
        style={{ height: accordionHeight }}
      >
        <div ref={ref}>
          <input onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)}/>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Accordion
