import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
type InformationCardProps = {
  title: string
  description: string
  buttonText: string
  buttonDestination: string
}
export default function InformationCard({
  title,
  description,
  buttonText,
  buttonDestination
}: InformationCardProps) {
  const router = useRouter()
  return (
    <div className="max-w-2xl self-center rounded-lg border-2 bg-white p-8 text-gray-500 shadow-xl">
      <h1 className="mb-4 text-center text-4xl font-extrabold">{title}</h1>
      <h2 className="text-center text-2xl font-semibold">{description}</h2>
      <div className="mt-6 flex justify-center">
        <Button
          onClick={() => router.push(`${buttonDestination}`)}
          className="rounded-full bg-primary px-4 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-opacity-80"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
