import React from 'react'
type TProps = {
  children: React.ReactNode;
};
export function UserContainer ({ children }: TProps) {
  return <div className="flex flex-col justify-center mx-auto bg-[url(/devImages/wallpaper.jpg)] bg-center bg-fixed bg-cover">{children}</div>
}
