import AdministrationLayout from '@/components/templates/layouts'
import InformationCard from '@/components/molecules/Card/InformationCard'
import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'
import Input from '@/components/atoms/Input'
function CreateUserForm () {
  const { register, handleSubmit, formState, watch, control } = useForm()
  const onSubmit = () => {
    console.log(watch())
  }
  return (
    <AdministrationLayout>
      <article className='flex items-center justify-center min-w-full h-screen mt-9'>
        <InformationCard title='Crea un nuevo usuario' className='w-full'>
          <form
            className='flex flex-col items-center w-full'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-col md:grid md:grid-cols-2 md:gap-5 w-full'>
              <Input
                control={control}
                name='name'
                type='text'
                label='Nombre'
                placeholder='Nombre'
                required
              />
              <Input
                control={control}
                name='lastName'
                type='text'
                label='Apellido'
                placeholder='Apellido'
                rules={{ required: 'Este campo es obligatorio', minLength: { value: 3, message: 'Mínimo 3 caracteres' } }}
                required
                />
              <Input
                control={control}
                name='email'
                type='email'
                label='Email'
                placeholder='email'
                required
                />
              <Input
                control={control}
                name='password'
                type='password'
                label='Contraseña'
                placeholder='Contraseña'
                required/>
              <Input
                control={control}
                name='confirmPassword'
                type='password'
                label='Confirma la contraseña'
                placeholder='Confirma la contraseña'
                required
                />
              <Input
                control={control}
                name='phone'
                type='number'
                label='Telefono'
                placeholder='Telefono'
                required
                />
            </div>
            <Button type='submit' color='primary' className='w-1/7 mt-3'>
              Agregar
            </Button>
          </form>
        </InformationCard>
      </article>
    </AdministrationLayout>
  )
}
export default CreateUserForm
