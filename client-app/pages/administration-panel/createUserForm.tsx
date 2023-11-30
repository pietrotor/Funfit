import AdministrationLayout from '@/components/templates/layouts'
import InformationCard from '@/components/molecules/Card/InformationCard'
import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'
function CreateUserForm () {
  const { register, handleSubmit, formState, watch } = useForm()
  const onSubmit = () => {
    console.log(watch())
  }
  return (
    <AdministrationLayout>
        <article className="flex items-center justify-center min-w-full h-screen mt-9">
        <InformationCard title='Crea un nuevo usuario' className="" >
            <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
               <div className='flex flex-col md:grid md:grid-cols-2 md:gap-3'>
               <label className="col text-gray-500 font-semibold ">Nombre
                <input className="border-2 border-gray-200 rounded-lg p-2 w-full  focus:outline-none focus:border-primary"
                type="text"
                placeholder="Nombre"
                {
                    ...register('name', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      maxLength: { value: 20, message: 'No más de 20 carácteres!' },
                      minLength: { value: 3, message: 'Mínimo 3 carácteres' },
                      pattern: { value: /^[A-Za-z]+$/i, message: 'Solo se permiten letras' }
                    })
                }
                />
                {formState.errors.name && <span className='text-red-500 text-sm'>{formState.errors.name.message?.toString()}</span>
                }
                </label>
                <label className=" col text-gray-500 font-semibold md:mt-0 mt-4">Apellido
                <input className="border-2 w-full border-gray-200 rounded-lg p-2  focus:outline-none focus:border-primary"
                type="text"
                placeholder="Apellido"
                {
                    ...register('lastName', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      maxLength: { value: 20, message: 'No más de 20 carácteres!' },
                      minLength: { value: 3, message: 'Mínimo 3 carácteres' },
                      pattern: { value: /^[A-Za-z]+$/i, message: 'Solo se permiten letras' }
                    })
                } />
                {formState.errors.lastName && <span className='text-red-500 text-sm'>{formState.errors.lastName.message?.toString()}</span>
                }
                </label>
                <label className="text-gray-500 font-semibold mt-4">Email
                <input className="border-2 w-full border-gray-200 rounded-lg p-2  focus:outline-none focus:border-primary"
                type="text"
                placeholder="Email"
                {
                    ...register('email', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      maxLength: { value: 30, message: 'No más de 20 carácteres!' },
                      minLength: { value: 3, message: 'Mínimo 3 carácteres' },
                      pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }
                    })
                } />
                {formState.errors.email && <span className='text-red-500 text-sm'>{formState.errors.email.message?.toString()}</span>
                }
                </label>
                <label className="text-gray-500 font-semibold mt-4">Contraseña
                <input className="border-2 w-full border-gray-200 rounded-lg p-2  focus:outline-none focus:border-primary"
                type="password"
                placeholder="Contraseña"
                {
                    ...register('password', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      maxLength: { value: 20, message: 'No más de 20 carácteres!' },
                      minLength: { value: 3, message: 'Mínimo 3 carácteres' },
                      pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'La contraseña debe tener al menos 8 caracteres, una letra y un número' }
                    })
                } />
                {(formState.errors.password && <span className='text-red-500 text-sm'>{formState.errors.password.message?.toString()}</span>) || (watch('password') !== watch('confirmPassword') && <span className='text-red-500 text-sm'>Las contraseñas no coinciden</span>)
                }
                </label>
                <label className="text-gray-500 font-semibold mt-4">Confirmar contraseña
                <input className="border-2 w-full border-gray-200 rounded-lg p-2  focus:outline-none focus:border-primary"
                type="password"
                placeholder="Confirmar contraseña"
                {
                    ...register('confirmPassword', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      maxLength: { value: 20, message: 'No más de 20 carácteres!' },
                      minLength: { value: 3, message: 'Mínimo 3 carácteres' },
                      pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'La contraseña debe tener al menos 8 caracteres, una letra y un número' }
                    })
                } />
                {(formState.errors.confirmPassword && <span className='text-red-500 text-sm'>{formState.errors.confirmPassword.message?.toString()}</span>) || (watch('password') !== watch('confirmPassword') && <span className='text-red-500 text-sm'>Las contraseñas no coinciden</span>)
                }
                </label>
                <label className="text-gray-500 font-semibold mt-4">Celular
                <input className="border-2 w-full border-gray-200 rounded-lg p-2  focus:outline-none focus:border-primary"
                type="text"
                placeholder="Celular"
                {
                    ...register('phone', {
                      required: {
                        value: true,
                        message: 'Este campo es requerido'
                      },
                      maxLength: { value: 20, message: 'No más de 20 carácteres!' },
                      minLength: { value: 3, message: 'Mínimo 3 carácteres' },
                      pattern: { value: /^[0-9]*$/, message: 'Solo se permiten números' }
                    })
                } />
                {formState.errors.phone && <span className='text-red-500 text-sm'>{formState.errors.phone.message?.toString()}</span>
                }
                </label>
               </div>
                <Button type="submit" color="primary" className="w-1/7 mt-3">
                    Agregar
                </Button>
                </form>
        </InformationCard>
        </article>
    </AdministrationLayout>
  )
}
export default CreateUserForm
