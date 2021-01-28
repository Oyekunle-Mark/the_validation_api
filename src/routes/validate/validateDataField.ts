import { NextFunction, Request, Response } from 'express'
import {
  createMissingFromMessage,
  createResponse,
  FieldNames,
  HttpStatusCode,
  ResponseMessage,
  ResponseStatus,
} from '../../common'

export const validateDataField = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const {
    data,
    rule: { field },
  } = req.body

  if (data === undefined) {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      ResponseMessage.DataRequired,
      ResponseStatus.error
    )
  }

  if (typeof data === 'number') {
    return createResponse(
      res,
      HttpStatusCode.StatusBadRequest,
      ResponseMessage.DataCannotBeNumber,
      ResponseStatus.error
    )
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  let resultantTargetFieldValue: object

  if (data.length !== 'undefined' || typeof data === 'string') {
    if (field >= data.length) {
      return createResponse(
        res,
        HttpStatusCode.StatusBadRequest,
        createMissingFromMessage(field, FieldNames.data),
        ResponseStatus.error
      )
    }

    resultantTargetFieldValue = data[field]
  } else {
    const levels = field.split('.')

    if (levels.length > 1) {
      const [level1, level2] = levels
      const nestedObject = data[level1]

      if (nestedObject === 'undefined') {
        return createResponse(
          res,
          HttpStatusCode.StatusBadRequest,
          createMissingFromMessage(field, FieldNames.data),
          ResponseStatus.error
        )
      }

      const dataFieldValue = nestedObject[level2]

      if (dataFieldValue === 'undefined') {
        return createResponse(
          res,
          HttpStatusCode.StatusBadRequest,
          createMissingFromMessage(field, FieldNames.data),
          ResponseStatus.error
        )
      }

      resultantTargetFieldValue = dataFieldValue
    } else {
      const [targetField] = levels
      const dataFieldValue = data[targetField]

      if (dataFieldValue === 'undefined') {
        return createResponse(
          res,
          HttpStatusCode.StatusBadRequest,
          createMissingFromMessage(field, FieldNames.data),
          ResponseStatus.error
        )
      }

      resultantTargetFieldValue = dataFieldValue
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  req.targetFieldValue = resultantTargetFieldValue

  next()
}
