import { Response } from 'express'

interface IHttpStatusCode {
  StatusOk: number
  StatusBadRequest: number
  StatusInternalServerError: number
}

export const HttpStatusCode: IHttpStatusCode = {
  StatusOk: 200,
  StatusBadRequest: 400,
  StatusInternalServerError: 500,
}

export enum ResponseStatus {
  success = 'success',
  error = 'error',
}

interface IResponseMessage {
  GetDetails: string
  RuleRequired: string
  DataRequired: string
  RuleShouldBeObject: string
  DataCannotBeNumber: string
  InvalidJsonPayload: string
  InvalidConditionValue: string
  RuleFieldCannotBeEmpty: string
  ErrorOccurred: string
}

export const ResponseMessage: IResponseMessage = {
  GetDetails: 'The Rule-Validation API.',
  RuleRequired: 'rule is required.',
  DataRequired: 'data is required.',
  RuleShouldBeObject: 'rule should be an object.',
  DataCannotBeNumber: 'data should be an object, array or string.',
  InvalidJsonPayload: 'Invalid JSON payload passed.',
  InvalidConditionValue:
    'rule.condition should be one of eq, neq, gt, gte, or contains.',
  RuleFieldCannotBeEmpty: 'rule.field cannot be an empty string.',
  ErrorOccurred: 'An error occurred on the server.',
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
  data: object | null = null
): Response => {
  const responseObject = {
    message,
    status: responseStatus,
    data,
  }

  return res.status(httpStatusCode).json(responseObject)
}
