import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { ArrowLeft } from 'lucide-react'

function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="bordered"
      className="border-stone-200 bg-white text-stone-600 data-[hover=true]:bg-stone-50"
      onClick={() => router.back()}
      startContent={<ArrowLeft className="h-4 w-4" strokeWidth={1.75} />}
    >
      Atrás
    </Button>
  )
}

export default BackButton
