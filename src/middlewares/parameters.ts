import { NextFunction, Request, Response } from 'express'

export const getParamNameMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  paramName
) => {
  console.log('getParamNameMiddleware - paramName - ', paramName)
  req.paramName = paramName
  return next()
}

// and etc ...
export const getSecondParamMiddleware = (req, res, next, secondParam) => {
  console.log('getSecondParamMiddleware - secondParam:', secondParam)
  console.log('getSecondParamMiddleware - req:', req)
  req.secondParam = secondParam
  return next()
}
