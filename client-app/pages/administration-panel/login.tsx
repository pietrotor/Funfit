import { useLoginLazyQuery, useLoginQuery } from '@/graphql/graphql-types'
import { Button, Input } from '@nextui-org/react'
import { NextPage } from 'next'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

type TLoginInput = {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const [loginQuery, { data, loading, refetch }] = useLoginLazyQuery()

  const { control, handleSubmit } = useForm<TLoginInput>()
  const onHandleLogin = (form: TLoginInput) => {
    console.log(form)
    loginQuery({
      variables:
       {
         loginInput:
         { email: form.email, password: form.password }
       },
      onCompleted (data) {
        console.log(data)
      }
    })
  }
  return (
    <div className='h-screen bg-gray-300 flex items-center justify-center'>
      <div className='p-8 rounded-2xl shadow-2xl bg-white w-full mx-3 md:w-fit md:min-w-[400px]'>
        {/* <img className='w-32 m-auto mb-8' src='https://upload.wikimedia.org/wikipedia/commons/0/08/Logo_azul_INSCHOLAR_PLATAFORMA.png'/> */}
        <h1 className='mb-7 capitalize'>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onHandleLogin)}>
          <div className='flex flex-col gap-5 mb-8'>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <Input {...field} validationState={`${errors.email ? 'invalid' : 'valid'}`} errorMessage={errors.email?.message} type="email" variant={'bordered'} label="Email" placeholder="Ingresa tu email" />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <Input {...field} validationState={`${errors.password ? 'invalid' : 'valid'}`} errorMessage={errors.email?.message} type="password" variant={'bordered'} label="Contraseña" placeholder="********" />
              )}
            />
          </div>
          <Button isLoading={ loading } type='submit' fullWidth color='primary' className='py-7'>
            <p className='text-lg font-semibold'>Ingresar</p>
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
