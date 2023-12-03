import { Request, Response } from 'express'
export interface ContextGraphQl {
  res: Response;
  req: Request;
}
