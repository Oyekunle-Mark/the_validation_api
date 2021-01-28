import { Response } from 'express'

interface IHttpStatusCode {
  StatusOk: number
  StatusBadRequest: number
}

export const HttpStatusCode: IHttpStatusCode = {
  StatusOk: 200,
  StatusBadRequest: 400,
}

export enum ResponseStatus {
  success = 'success',
  error = 'error',
}

interface IResponseMessage {
  GetDetails: 'The Rule-Validation API'
}

/**
 * Builds and sends the API response.
 *
 * @param {Response} res
 * @param {Number} httpStatusCode the status code
 * @param {String} message the response message
 * @param {ResponseStatus} responseStatus indicates if request was a success or an error
 * @param {Object} data the data to be sent over
 */
export const createResponse = (
  res: Response,
  httpStatusCode: number,
  message: string,
  responseStatus: ResponseStatus,
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: object | string
): Response => {
  let responseObject: Record<string, unknown>

  if (responseStatus === ResponseStatus.success) {
    responseObject = {
      message,
      status: responseStatus,
      data,
    }
  } else {
    responseObject = {
      message,
      status: responseStatus,
      data: null,
    }
  }

  return res.status(httpStatusCode).json(responseObject)
}
