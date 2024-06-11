import React, { HTMLProps } from 'react'

type TContainer = {
  children: React.ReactNode
  background?: HTMLProps<HTMLElement>['className']
  paddingX?: HTMLProps<HTMLElement>['className']
  paddingY?: HTMLProps<HTMLElement>['className']
  id?: string
}

const Container: React.FC<TContainer> = ({
  background = 'bg-transparent',
  paddingX = 'px-0',
  paddingY = 'py-0',
  id,
  children
}) => {
  return (
    <div
      id={id}
      className={`m-auto w-full px-8 lg:px-10 xl:max-w-[1440px] ${background} ${paddingX} ${paddingY}`}
      style={{ scrollMarginTop: '145px' }}
    >
      {children}
    </div>
  )
}

export default Container
