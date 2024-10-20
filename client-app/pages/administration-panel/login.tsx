import { Button, Input } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { StatusEnum, useLoginLazyQuery } from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { userVerificated } from '@/utils/userVericated'

type TLoginInput = {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const [loginQuery, { loading }] = useLoginLazyQuery({
    fetchPolicy: 'network-only'
  })
  const [error, setError] = useState('')
  const router = useRouter()
  const { control, handleSubmit } = useForm<TLoginInput>()
  const onHandleLogin = (form: TLoginInput) => {
    loginQuery({
      variables: {
        loginInput: { email: form.email, password: form.password }
      },
      onCompleted(data) {
        if (data.login?.status === StatusEnum.OK) {
          // localStorage.setItem('token', data.login.token?.toString()!)
          Cookies.set('sao-sess', data.login.token?.toString()!, { expires: 7 })
          showSuccessToast(data.login.message || 'Bienvenido', 'success')
          // router.push('/administration-panel/dailySale')
          router.reload()
          return
        }
        showSuccessToast(
          `se ha producido un error: ${data.login?.message}`,
          'error'
        )
        console.log(data)
        setError(data.login?.message?.toString()!)
      }
    })
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-300">
      <div className="mx-3 w-full rounded-2xl bg-white p-8 shadow-2xl md:w-fit md:min-w-[400px]">
        {/* <img className='w-32 m-auto mb-8' src='https://upload.wikimedia.org/wikipedia/commons/0/08/Logo_azul_INSCHOLAR_PLATAFORMA.png'/> */}
        <h1 className="mb-7 capitalize">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onHandleLogin)}>
          <div className="mb-8 flex flex-col gap-5">
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <Input
                  {...field}
                  validationState={`${errors.email ? 'invalid' : 'valid'}`}
                  errorMessage={errors.email?.message}
                  type="email"
                  variant={'bordered'}
                  label="Email"
                  placeholder="Ingresa tu email"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <Input
                  {...field}
                  validationState={`${errors.password ? 'invalid' : 'valid'}`}
                  errorMessage={errors.email?.message}
                  type="password"
                  variant={'bordered'}
                  label="Contraseña"
                  placeholder="********"
                />
              )}
            />
          </div>
          <Button
            isLoading={loading}
            type="submit"
            fullWidth
            color="primary"
            className="py-7"
          >
            <p className="text-lg font-semibold">Ingresar</p>
          </Button>
          {error && (
            <span className="flex justify-center text-red-500">{error}</span>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginPage
export const getServerSideProps: GetServerSideProps = async ctx =>
  await userVerificated(ctx)
