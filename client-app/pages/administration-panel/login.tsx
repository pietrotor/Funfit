import { Button, Input } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { StatusEnum, useLoginLazyQuery } from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { userVerificated } from '@/utils/userVericated'

type TLoginInput = {
  email: string
  password: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 + i * 0.06,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

const inputClassNames = {
  label: 'text-sm font-medium text-tertiary',
  inputWrapper: [
    'h-12 bg-white shadow-none border-1 border-stone-300 ring-primary/20',
    'data-[hover=true]:border-stone-400',
    'group-data-[focus=true]:border-primary group-data-[focus=true]:ring-4',
    'group-data-[focus-visible=true]:ring-4 group-data-[focus-visible=true]:ring-primary/20 group-data-[focus-visible=true]:ring-offset-0',
    'group-data-[invalid=true]:border-danger group-data-[invalid=true]:ring-danger/15'
  ].join(' '),
  input: 'text-[15px] text-tertiary placeholder:text-stone-400',
  errorMessage: 'text-[13px]'
}

const LoginPage: NextPage = () => {
  const [loginQuery, { loading }] = useLoginLazyQuery({
    fetchPolicy: 'network-only'
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const router = useRouter()
  const {
    control,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors }
  } = useForm<TLoginInput>({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched'
  })

  const onLoginFailed = (message: string) => {
    setError(message)
    setShowPassword(false)
    setValue('password', '')
    setFocus('password')
  }

  const onHandleLogin = (form: TLoginInput) => {
    setError('')
    setShowPassword(false)
    loginQuery({
      variables: {
        loginInput: { email: form.email.trim(), password: form.password }
      },
      onCompleted(data) {
        if (data.login?.status === StatusEnum.OK) {
          Cookies.set('sao-sess', data.login.token?.toString()!, { expires: 7 })
          showSuccessToast(data.login.message || 'Bienvenido', 'success')
          router.reload()
          return
        }
        onLoginFailed(
          data.login?.message?.toString() ||
            'El email o la contraseña no son correctos.'
        )
      },
      onError() {
        onLoginFailed(
          'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.'
        )
      }
    })
  }

  const onPasswordKey = (e: React.KeyboardEvent<HTMLInputElement>) =>
    setCapsLockOn(e.getModifierState('CapsLock'))

  return (
    <MotionConfig reducedMotion="user">
      <Head>
        <title>Iniciar sesión · FunFit Admin</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="grid min-h-[100dvh] bg-[#FFFAF3] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <main className="relative flex flex-col px-6 py-8 sm:px-10 lg:px-16">
          <Image
            src="/common/logo.png"
            alt="FunFit"
            width={132}
            height={89}
            priority
            className="-ml-3 h-auto w-[132px]"
          />

          <div className="flex flex-1 items-center py-10">
            <div className="mx-auto w-full max-w-[380px]">
              <motion.p
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mb-2 font-amatemora text-3xl leading-none text-secondary"
              >
                Hola de nuevo
              </motion.p>
              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="font-amsipro text-[2.5rem] font-bold leading-[1.05] tracking-tight text-tertiary"
              >
                Ingresa al panel de administración
              </motion.h1>
              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-3 text-[15px] leading-relaxed text-stone-500"
              >
                Usa tu cuenta de FunFit para gestionar ventas, pedidos y
                sucursales.
              </motion.p>

              <motion.form
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                noValidate
                aria-label="Iniciar sesión"
                onSubmit={handleSubmit(onHandleLogin)}
                className="mt-9 flex flex-col gap-6"
              >
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Ingresa tu email',
                    pattern: {
                      value: EMAIL_PATTERN,
                      message:
                        'Revisa el formato, por ejemplo: nombre@funfit.com'
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="username"
                      autoCapitalize="none"
                      spellCheck={false}
                      variant="bordered"
                      labelPlacement="outside"
                      label="Email"
                      placeholder="nombre@funfit.com"
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message}
                      startContent={
                        <Mail
                          aria-hidden
                          className="h-[18px] w-[18px] shrink-0 text-stone-400"
                        />
                      }
                      classNames={inputClassNames}
                    />
                  )}
                />

                <div>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Ingresa tu contraseña' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        autoCapitalize="none"
                        spellCheck={false}
                        variant="bordered"
                        labelPlacement="outside"
                        label="Contraseña"
                        placeholder="Tu contraseña"
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                        onKeyDown={onPasswordKey}
                        onKeyUp={onPasswordKey}
                        onBlur={() => {
                          setCapsLockOn(false)
                          field.onBlur()
                        }}
                        startContent={
                          <Lock
                            aria-hidden
                            className="h-[18px] w-[18px] shrink-0 text-stone-400"
                          />
                        }
                        endContent={
                          <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            aria-label={
                              showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                            }
                            aria-controls="password"
                            className="-mr-1 rounded-md p-1 text-stone-400 outline-none transition-colors hover:text-tertiary focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            {showPassword ? (
                              <EyeOff
                                aria-hidden
                                className="h-[18px] w-[18px]"
                              />
                            ) : (
                              <Eye aria-hidden className="h-[18px] w-[18px]" />
                            )}
                          </button>
                        }
                        classNames={inputClassNames}
                      />
                    )}
                  />
                  {capsLockOn && (
                    <p
                      role="status"
                      className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-amber-700"
                    >
                      <AlertCircle aria-hidden className="h-3.5 w-3.5" />
                      Bloq Mayús está activado
                    </p>
                  )}
                </div>

                {error && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 rounded-xl border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700"
                  >
                    <AlertCircle
                      aria-hidden
                      className="mt-0.5 h-4 w-4 shrink-0"
                    />
                    <span>{error}</span>
                  </motion.div>
                )}

                <Button
                  isLoading={loading}
                  type="submit"
                  fullWidth
                  size="lg"
                  radius="md"
                  endContent={
                    !loading && (
                      <ArrowRight
                        aria-hidden
                        className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
                      />
                    )
                  }
                  className="group mt-1 h-12 bg-[#E06C00] text-base font-semibold text-white shadow-[0_8px_20px_-8px_rgba(224,108,0,0.6)] transition-colors data-[hover=true]:bg-[#C95F00] data-[hover=true]:opacity-100"
                >
                  {loading ? 'Ingresando…' : 'Ingresar'}
                </Button>
              </motion.form>

              <motion.p
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-8 text-center text-sm text-stone-500"
              >
                ¿Olvidaste tu contraseña? Pídele al administrador que la
                restablezca.
              </motion.p>
            </div>
          </div>

          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} FunFit
          </p>
        </main>

        <aside
          aria-hidden
          className="relative hidden overflow-hidden p-3 lg:block"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-30px_rgba(120,60,0,0.35)] ring-1 ring-black/5"
          >
            <Image
              src="/common/portada-mobile.jpg"
              alt=""
              fill
              priority
              sizes="55vw"
              className="object-cover"
            />
          </motion.div>
        </aside>
      </div>
    </MotionConfig>
  )
}

export default LoginPage
export const getServerSideProps: GetServerSideProps = async ctx =>
  await userVerificated(ctx)
