import React from 'react'
type TProps = {
  children: React.ReactNode;
};
export function UserContainer ({ children }: TProps) {
  return <div className="  mx-auto w-4/5  ">{children}</div>
}
