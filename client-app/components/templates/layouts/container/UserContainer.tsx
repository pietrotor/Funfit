import React from 'react'
type TProps = {
  children: React.ReactNode;
};
export function UserContainer ({ children }: TProps) {
  return <div className="mx-auto contaner  bg-[url(/devImages/wallpaper.jpg)]  bg-center  bg-fixed bg-cover">{children}</div>
}
