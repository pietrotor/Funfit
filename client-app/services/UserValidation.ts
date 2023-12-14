import { authUserHeader } from '@/utils/verificationUser'

export const userValidation = async (ctx: any) => {
  try {
    return authUserHeader(ctx)
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/administration-panel/login'
      }
    }
  }
}
