import React from 'react'
type TProps = {
  children: React.ReactNode;
};
export function UserContainer ({ children }: TProps) {
  return <div className="mx-auto contaner backdrop-blur-3xl bg-secondary/40 bg-[url(/devImages/wallpaper.jpg)]  bg-center  bg-fixed bg-cover">{children}</div>
}
