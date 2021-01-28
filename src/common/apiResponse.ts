import { Response } from 'express'

interface IHttpStatus {
  StatusOk: number
  StatusCreated: number
  StatusBadRequest: number
  StatusUnauthorized: number
  StatusNotFound: number
  StatusUnprocessableEntity: number
  StatusInternalServerError: number
}

export const HttpStatus: IHttpStatus = {
  StatusOk: 200,
  StatusCreated: 201,
  StatusBadRequest: 400,
  StatusUnauthorized: 401,
  StatusNotFound: 404,
  StatusUnprocessableEntity: 422,
  StatusInternalServerError: 500,
}

interface IResponseType {
  Success: boolean
  Failure: boolean
}

export const ResponseType: IResponseType = {
  Success: true,
  Failure: false,
}

/**
 * Builds, logs, and sends the response.
 *
 * @param {Response} res
 * @param {Number} httpStatusCode the status code
 * @param {Boolean} responseType indicates if request was successful or not
 * @param {Object} data the data to be sent over
 */
export const createResponse = (
  res: Response,
  httpStatusCode: number,
  responseType: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: object | string
): Response => {
  let responseObject: Record<string, unknown>

  if (responseType) {
    responseObject = {
      status: httpStatusCode,
      data,
    }
  } else {
    responseObject = {
      status: httpStatusCode,
      error: data,
    }
  }

  return res.status(httpStatusCode).json(responseObject)
}
