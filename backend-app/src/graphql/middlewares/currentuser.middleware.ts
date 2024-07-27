import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserPayload } from '../../interfaces/global.interface'
import dotenv from 'dotenv'
dotenv.config()
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log('------------------------HEADERS-------------------------------------------------------------------')
  // console.log(req.headers)
  // console.log('-------------------- apollo header AUTORIZATION FIELD-----------------------------------------------------------------------')
  // eslint-disable-next-line dot-notation
  // console.log(req.headers.authorization)
  // console.log('-------------------------------------------------------------------------------------------')
  if (req.headers.authorization) {
    console.log(
      '🚀 ~ process.env.JWT_KEY: =================================',
      process.env.JWT_KEY
    )
    console.log('🚀 ~ req.headers.authorization:', req.headers.authorization)
    try {
      const payload = <UserPayload>(
        jwt.verify(req.headers.authorization, process.env.JWT_KEY!)
      )
      console.log('🚀 ~ payload:', payload)
      console.log(payload)
      req.currentUser = payload
    } catch (error) {
      console.log('error currentUser', error)
      // cookies.remove('ferroblack-sess')
    }
  }
  next()
}
