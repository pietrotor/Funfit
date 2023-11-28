import * as yup from 'yup'

export const loginValidator = yup.object().shape({
  email: yup
    .string()
    .email('debe ser un email válido')
})

export const newUserValidator = yup.object().shape({
  email: yup
    .string()
    .email('debe ser un email válido'),
  name: yup
    .string()
    .typeError('nombre es obligatorio'),
  position: yup
    .string()
    .typeError('cargo es obligatorio'),
  last_name: yup
    .string()
    .typeError('apellido(s) es obligatorio'),
  password: yup
    .string()
    .min(6, 'password muy corto'),
  rol: yup
    .number()
    .min(1)
    .max(2)
})
