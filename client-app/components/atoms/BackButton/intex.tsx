import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
function BackButton() {
  const router = useRouter()

  return (
        <Button
        variant='bordered'
        color="primary"
        onClick={() => router.back()}
        >
        Back
        </Button>
  )
}
export default BackButton
