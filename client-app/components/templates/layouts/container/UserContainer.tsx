import React from 'react'
type TProps = {
  children: React.ReactNode
}
export function UserContainer({ children }: TProps) {
  return (
    <div className="mx-auto flex min-h-screen flex-col justify-center bg-[url(/devImages/wallpaper.jpg)] bg-cover bg-fixed bg-center">
      {children}
    </div>
  )
}
