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
    <div className={`w-full xl:max-w-7xl lg:max-w-4xl md:max-w-2xl max-w-xs m-auto ${background} ${paddingX} ${paddingY}`}>
      {children}
    </div>
  )
}

export default Container
