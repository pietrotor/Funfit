import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import IconSelector from '../IconSelector'
function BackButton() {
  const router = useRouter()

  return (
        <Button
        variant='bordered'
        color="primary"
        className='mt-8 mdms-4'
        onClick={() => router.back()}
        >
        <IconSelector name='arrow-left'/>
          Atrás
        </Button>
  )
}
export default BackButton
