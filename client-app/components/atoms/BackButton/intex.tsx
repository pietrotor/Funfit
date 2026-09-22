import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { ArrowLeft } from 'lucide-react'

function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="bordered"
      color="primary"
      className="mt-8 bg-white md:ms-4"
      onClick={() => router.back()}
      startContent={<ArrowLeft className="h-5 w-5" strokeWidth={1.75} />}
    >
      Atrás
    </Button>
  )
}

export default BackButton
