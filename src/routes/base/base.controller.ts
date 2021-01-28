import { Request, Response } from 'express'
import { IUserDetails } from './base.type'
import {
  createResponse,
  HttpStatusCode,
  ResponseMessage,
  ResponseStatus,
} from '../../common'

export const baseController = (req: Request, res: Response): Response => {
  const userDetails: IUserDetails = {
    name: 'Oyekunle Oloyede',
    github: '@Oyekunle-Mark',
    email: 'oyekunlemac@gmail.com',
    mobile: '08064286205',
    twitter: '@ChiefOye',
  }

  return createResponse(
    res,
    HttpStatusCode.StatusOk,
    ResponseMessage.GetDetails,
    ResponseStatus.success,
    userDetails
  )
}
