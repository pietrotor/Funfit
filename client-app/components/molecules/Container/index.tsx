import React, { HTMLProps } from 'react'

type TContainer = {
  children: React.ReactNode
  background?: HTMLProps<HTMLElement>['className']
  paddingX?: HTMLProps<HTMLElement>['className']
  paddingY?: HTMLProps<HTMLElement>['className']
}

const Container: React.FC<TContainer> = ({
  background = 'bg-transparent',
  paddingX = 'px-0',
  paddingY = 'py-0',
  children
}) => {
  return (
    <div className={`w-full max-w-7xl m-auto ${background} ${paddingX} ${paddingY}`}>
      {children}
    </div>
  )
}

export default Container
