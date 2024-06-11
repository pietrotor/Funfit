import React from 'react'
type TProps = {
  children: React.ReactNode
}
export function UserContainer({ children }: TProps) {
  return (
    <div className="relative mx-auto flex min-h-screen flex-col justify-center bg-[url(/devImages/wallpaper.jpg)] bg-cover bg-fixed bg-center">
      {/* Overlay negro */}
      <div className="absolute inset-0 bg-black opacity-[0.1]"></div>

      {/* Contenido */}
      <div className="relative">{children}</div>
    </div>
  )
}
