type TPropsIsNotContent = {
    text: string
    }
export const IsNotContent = ({ text }: TPropsIsNotContent) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-2xl text-gray-400">{text}</p>
    </div>
  )
}
